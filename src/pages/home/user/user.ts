import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'user.html',
})
export class UserPage {
  public login:object = {
    cid: null,
    senha: null,
    email: null,
    capitulo: null
  };
  public page_options = {
    mostrar_cadastrar: null,
    usuario_esta_logado: false,
  }
  public formulario = 'login';
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
    this.formulario = 'login';
    console.log(this.formulario);   
    this.storage.get('cadastro').then(data => {
      this.page_options.mostrar_cadastrar = !data; 
    });
    this.storage.get('usuario-logado').then(usuario_logado => {
      console.log(usuario_logado);
      this.usuario_logado = usuario_logado ? usuario_logado : false;
      this.page_options.usuario_esta_logado = true;
    });
    this.events.subscribe('usuario_logou', (logado) => {
      this.page_options.usuario_esta_logado = logado ? logado : false;
      console.log(logado);
    });
  }
  cadastrar(){
    this.api.post('conta/cadastrar', this.login).then(cadastrar => {
      let toast_sucesso_cadastro = this.toastCtrl.create({
        message: cadastrar['mensagem'],
        duration: 3000,
        position: 'top'
      });
      toast_sucesso_cadastro.present();
      toast_sucesso_cadastro.onDidDismiss(() => {
        this.page_options.mostrar_cadastrar = false;
        this.storage.set('cadastro', true);
        this.storage.set('usuario-cadastro', this.login);
        let modal_sucesso_cadastro = this.modalCtrl.create("ObrigadoCadastrarPage");
        modal_sucesso_cadastro.present();
      });
    }).catch(error => {
      let toast_erro_cadastro = this.toastCtrl.create({
        message: error['error'],
        duration: 3000,
        position: 'top'
      });
      toast_erro_cadastro.present();
    })
  }
  logar(){
    this.api.post('conta/logar', this.login).then(logar => {
      this.storage.set('usuario-logado', logar);
      this.events.publish('usuario_logou', true);
    }).catch(error => {
      let toast_erro_login = this.toastCtrl.create({
        message: error['mensagem'],
        duration: 3000,
        position: 'top'
      });
      toast_erro_login.present();  
    });
  }
}
