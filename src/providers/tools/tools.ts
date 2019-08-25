import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ModalController } from 'ionic-angular';

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
  ) {
  }
  slugify(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
  
    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to   = "aaaaeeeeiiiioooouuuunc------";
  
    for (var i=0, l=from.length ; i<l ; i++)
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  
  
    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes
  
    return str;
  }
  getUsuariosLogado(){
    return new Promise((response, error: Function) => {
      error => {
        this.modalCtrl.create('UserPage', {}, {
          enableBackdropDismiss: false
        });
      }
      this.banco.get('usuario-logado').then(retorno => {
        if(retorno) response(retorno['usuario']);
        else error();
      }).catch(() => { error(); });
    });
  }
}
