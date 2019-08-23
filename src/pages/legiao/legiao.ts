import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ModalController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';
import { AtividadesProvider } from '../../providers/atividades/atividades';


@IonicPage()
@Component({
  selector: 'page-legiao',
  templateUrl: 'legiao.html',
})
export class LegiaoPage {

  public usuario_logado;
  public atividades;
  public carregando = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    public banco: Storage,
    public actionSheetCtrl: ActionSheetController,
    public atividadesProvider: AtividadesProvider,
    public modalCtrl: ModalController,
  ) {
  }
  ionViewDidEnter() {
    this.banco.get('usuario-logado').then(usuario_logado => {
      if (usuario_logado) {
        this.usuario_logado = usuario_logado['usuario'];
        this.getAtividadesCapitulo();
      } else {
        let modal_user = this.modalCtrl.create("UserPage", {}, {
          enableBackdropDismiss: false,
        });
        modal_user.present();
        modal_user.onDidDismiss(usuario_logado => {
          if (usuario_logado) this.usuario_logado = usuario_logado;
        });
      }
    }).catch(() => {
      let modal_user = this.modalCtrl.create("UserPage", {}, {
        enableBackdropDismiss: false,
      });
      modal_user.present();
      modal_user.onDidDismiss(usuario_logado => {
        if (usuario_logado) this.usuario_logado = usuario_logado;
      });
    });
  }
  getAtividadesCapitulo() {
    this.api.get('legiao/get_atividades_legiao?capitulo=' + this.usuario_logado['capitulo']).then(atividades => {
      this.atividades = atividades['atividades'];
      this.carregando = false;
    }).catch(error => {
      this.atividades = null;
      console.log(error);
      this.carregando = false;
    });
  }
  opcoesAtividade(atividade) {
    this.atividadesProvider.opcoesAtividade({ atividade: atividade, role: this.usuario_logado.role }).then(retorno => {
      this.navCtrl.push(retorno['role_options']['page'], { atividade: retorno['atividade'] });
    });
  }
  opcoesLegiao() {
    let action_sheet_opcoes_legiao = this.actionSheetCtrl.create({
      title: 'Opções',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }
      ]
    });
    action_sheet_opcoes_legiao.present();
  }
}
