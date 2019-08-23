import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events, ModalController, App, ViewController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../../providers/api/api';
import { HomePage } from '../home';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'user.html',
})
export class UserPage {
  public login: object = {
    cid: null,
    senha: null,
    email: null,
    capitulo: null
  };
  public page_options = {
    mostrar_cadastrar: null,
    usuario_esta_logado: false,
  }
  public formulario: string = 'login';
  public usuario_logado: object = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    public toastCtrl: ToastController,
    public events: Events,
    public storage: Storage,
    public modalCtrl: ModalController,
    public appCtrl: App,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
  ) {
    this.storage.get('cadastro').then(data => {
      this.page_options.mostrar_cadastrar = !data;
    });
    this.storage.get('usuario-logado').then(usuario_logado => {
      this.usuario_logado = usuario_logado ? usuario_logado : false;
      this.page_options.usuario_esta_logado = true;
    });
    this.events.subscribe('usuario_logou', (logado) => {
      this.page_options.usuario_esta_logado = logado ? logado : false;
    });
  }
  cadastrar() {
    let loading = this.loadingCtrl.create({
      content: 'Verificando credenciais...'
    }); loading.present();
    this.api.post('conta/cadastrar', this.login).then(cadastrar => {
      loading.dismiss();
      this.page_options.mostrar_cadastrar = false;
      this.storage.set('cadastro', true);
      this.storage.set('usuario-cadastro', this.login);
      this.modalCtrl.create("ObrigadoCadastrarPage").present();
    }).catch(error => {
      loading.dismiss();
      this.toastCtrl.create({
        message: error['error'],
        duration: 3000,
      }).present();
    })
  }
  logar() {
    let loading = this.loadingCtrl.create({
      content: 'Verificando credenciais...'
    }); loading.present();
    this.api.post('conta/logar', this.login).then(logar => {
      if (logar['usuario']) {
        this.storage.set('usuario-logado', { usuario: logar['usuario'][0] });
        this.events.publish('usuario_logou', logar['usuario'][0]);
        this.viewCtrl.dismiss(logar['usuario'][0]);
        loading.dismiss();
        // this.navCtrl.setRoot('HomePage');
      } else {
        loading.dismiss();
        this.toastCtrl.create({
          message: "Houve um erro inesperado ao logar :(",
          duration: 3000,
          position: 'top'
        }).present();
      }
    }).catch(error => {
      this.toastCtrl.create({
        message: error['error'],
        duration: 3000,
        position: 'top'
      }).present();
    });
  }
}
