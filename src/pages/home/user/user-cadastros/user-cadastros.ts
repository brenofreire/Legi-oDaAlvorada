import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../../../providers/api/api';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-user-cadastros',
  templateUrl: 'user-cadastros.html',
})
export class UserCadastrosPage {

  public usuarios: any;
  public usuario_logado;
  public page_options = {
    loaded: false,
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    public toastCtrl: ToastController,
    public banco: Storage
  ) {
    this.banco.get('usuario-logado').then(usuario_logado => {
      this.get_usuarios_temporarios(usuario_logado['usuario']['capitulo']);
    }).catch(error => {
      console.log(error);
    });
  }
  get_usuarios_temporarios(capitulo) {
    this.api.get('conta/get_usuarios_temporarios?capitulo=' + capitulo).then(usuarios_temporarios => {
      this.usuarios = usuarios_temporarios['usuarios'] ? usuarios_temporarios['usuarios'] : false;

      this.page_options.loaded = true;
    }).catch(error => {
      this.page_options.loaded = true;
      let toast_erro_usuarios_temporarios = this.toastCtrl.create({
        message: error['error'],
        position: 'top',
        duration: 3000
      });
      toast_erro_usuarios_temporarios.present();
    });
  }
  modificarStatusUsuario(status, usuario) {
    let body = {
      status: status,
      usuario: usuario
    }
    this.api.post('conta/modificar_usuario_temporario', body).then(status_alterado => {
      for (let usuario of this.usuarios) {
        if(usuario['CID'] == status_alterado['CID']) {
          usuario['status'] = body.status;
        }
      }
      console.log(this.usuarios);
    }).catch(error => {
      console.log(error);
    });
  }
}
