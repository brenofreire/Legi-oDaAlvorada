import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events, ModalController, ActionSheetController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public usuario_logado: object = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    public toastCtrl: ToastController,
    public events: Events,
    public storage: Storage,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController
  ) {
    this.storage.get('usuario-logado').then(usuario_logado => {
      if (!usuario_logado) {
        let modal_user = this.modalCtrl.create("UserPage");
        modal_user.present();
      } else {
        this.usuario_logado = usuario_logado['usuario'];
      }
    });
  }
  ionViewDidLoad() {

  }
  actionSheetOpcoes() {
    let actionSheet_Opcoes = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Nova Atividade',
          handler: () => {
            this.navCtrl.push("LegiaoNovaTarefaPage");
          }
        },
        {
          text: 'Solicitações de Cadastro',
          handler: () => {
            this.navCtrl.push("UserCadastrosPage");
          }
        },
      ]
    });
    actionSheet_Opcoes.present();
  }
}
