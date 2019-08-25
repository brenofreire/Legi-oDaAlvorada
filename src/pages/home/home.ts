import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events, ModalController, ActionSheetController, AlertController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';

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
  ) {
    this.events.subscribe('usuario-logado', usuario => {
      this.usuario_logado = usuario;
    });
  }
  ionViewDidLoad() {
    // this.atualizarPerfil();
  }
  ionViewWillEnter() {
    this.storage.get('usuario-cadastro').then(usuario_cadastro => {
      if (usuario_cadastro) {
        let modal_obrigado = this.modalCtrl.create("ObrigadoCadastrarPage", {}, {
          enableBackdropDismiss: false,
        });
        modal_obrigado.present();
      } else {
        this.storage.get('usuario-logado').then(usuario_logado => {
          if (!usuario_logado) {
            let modal_user = this.modalCtrl.create("UserPage", {}, {
              enableBackdropDismiss: false,
            });
            modal_user.present();
            modal_user.onDidDismiss(usuario_logado => {
              if (usuario_logado) this.usuario_logado = usuario_logado;
            });
          } else {
            this.usuario_logado = usuario_logado['usuario'];
          }
        }).catch(() => { });
      }
    }).catch(() => { });
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
    if (Number(this.usuario_logado['role']) >= 7) {
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
            this.storage.set('usuario-logado', null);
            let modal_user = this.modalCtrl.create('UserPage', {}, {
              enableBackdropDismiss: false,
            }); modal_user.present();
            modal_user.onDidDismiss(usuario_logado => {
              if (usuario_logado) this.usuario_logado = usuario_logado;
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
