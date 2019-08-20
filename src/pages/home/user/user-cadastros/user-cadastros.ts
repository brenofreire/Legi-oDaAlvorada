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
      this.usuarios = usuarios_temporarios;
      this.usuarios = this.usuarios.length ? this.usuarios : false;

      this.page_options.loaded = true;
    }).catch(error => {
      this.usuarios = false;
      this.page_options.loaded = true;
    });
  }
  modificarStatusUsuario(status, usuario) {
    let body = {
      status: status,
      usuario: usuario
    }
    this.api.post('conta/modificar_usuario_temporario', body).then(status_alterado => {
      for (let usuario of this.usuarios) {
        if(usuario['cid'] == status_alterado['cid']) {
          usuario['status'] = body.status;
        }
      }
      console.log(this.usuarios);
    }).catch(error => {
      console.log(error);
    });
  }
}
