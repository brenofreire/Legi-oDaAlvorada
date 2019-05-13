import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events, ModalController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';
import { UserPage } from './user/user';

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
    public modalCtrl: ModalController
  ) {
    this.storage.get('usuario-logado').then(usuario_logado => {
      if(!usuario_logado) {
        let modal_user = this.modalCtrl.create(UserPage);
        modal_user.present();
      }
    });
  }
  ionViewDidLoad() {

  }
}
