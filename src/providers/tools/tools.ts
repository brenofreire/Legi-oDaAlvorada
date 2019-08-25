import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ModalController, Events } from 'ionic-angular';

/*
  Generated class for the ToolsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToolsProvider {

  constructor(
    public http: HttpClient,
    public banco: Storage,
    public modalCtrl: ModalController,
    public events: Events,
  ) {
  }
  slugify(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to = "aaaaeeeeiiiioooouuuunc------";

    for (var i = 0, l = from.length; i < l; i++)
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));


    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

    return str;
  }
  getUsuarioLogado() {
    return new Promise(response => {
      // se não tiver usuario logado exibe modal de login
      let error = () => {
        let modal = this.modalCtrl.create('UserPage', {}, {
          enableBackdropDismiss: false
        }); modal.present();
        modal.onDidDismiss(retorno => {
          this.banco.set('usuario-logado', { usuario: retorno });
          this.events.publish('usuario-logado', retorno);
          response(retorno);
        });
      }
      // busca o usuário logado
      this.banco.get('usuario-logado').then(retorno => {
        if (retorno) response(retorno['usuario']);
        else error();
      }).catch(() => { error(); });
    });
  }
  getUsuarioCadastrado() {
    return new Promise(response => {
      this.banco.get('usuario-cadastro').then(usuario_cadastro => {
        if (usuario_cadastro) {
          this.modalCtrl.create("ObrigadoCadastrarPage", {}, {
            enableBackdropDismiss: false,
          }).present();
          response(usuario_cadastro);
        } else response(undefined);
      }).catch(() => response(undefined));
    });
  }
}
