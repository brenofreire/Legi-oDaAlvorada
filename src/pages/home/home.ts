import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events, ModalController, ActionSheetController, AlertController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';
import { ToolsProvider } from '../../providers/tools/tools';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public usuario_logado;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    public toastCtrl: ToastController,
    public events: Events,
    public storage: Storage,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public tools: ToolsProvider,
  ) {
    this.events.subscribe('usuario-logado', retorno => { 
      this.usuario_logado = retorno; 
    });
  }
  async ionViewDidEnter() {
    let usuario_cadastrado = <any> await this.tools.getUsuarioCadastrado();
    if(!usuario_cadastrado) this.usuario_logado = await this.tools.getUsuarioLogado();
  }
  actionSheetOpcoes() {
    let buttons = [];
    buttons.push(
      {
        text: 'Ranking',
        icon: 'podium',
        handler: () => {
          this.navCtrl.push('RankingPage');
        }
      }
    );
    if (Number(this.usuario_logado['role']) >= 5) {
      buttons.push(
        {
          text: 'Nova Atividade',
          icon: 'add',
          handler: () => {
            this.navCtrl.push("LegiaoNovaTarefaPage");
          }
        },
        {
          text: 'Solicitações de Cadastro',
          icon: 'person',
          handler: () => {
            this.navCtrl.push("UserCadastrosPage");
          }
        }
      );
    }
    if (Number(this.usuario_logado['role']) >= 8) {
      buttons.push(
        {
          text: 'Superadmin',
          icon: 'lock',
          handler: () => {
            this.navCtrl.push("SuperadminPage");
          }
        }
      );
    }
    let actionSheet_Opcoes = this.actionSheetCtrl.create({
      buttons: buttons
    });
    actionSheet_Opcoes.present();
  }
  logout() {
    this.alertCtrl.create({
      title: 'Deseja realmente sair?',
      buttons: [
        'Não',
        {
          text: 'Sim',
          handler: () => {
            this.storage.set('usuario-logado', undefined).then(() => {
              this.tools.getUsuarioLogado();
            });
          }
        }
      ]
    }).present();
  }
  atualizarPerfil(e) {
    this.api.post('conta/get_perfil', this.usuario_logado).then(perfil => {
      let usuario_logado = { usuario: perfil }
      this.usuario_logado = perfil;
      this.storage.set('usuario-logado', usuario_logado);
      if (e)
        e.complete();
    }).catch(() => { e.complete(); });
  }
}
