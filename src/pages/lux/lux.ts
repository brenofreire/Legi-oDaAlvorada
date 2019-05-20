import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LuxPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lux',
  templateUrl: 'lux.html',
})
export class LuxPage {

  public usuario_logado;
  public atividades;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public api: ApiProvider,
    public banco: Storage
  ) {
  }

  ionViewDidEnter() {
    this.banco.get('usuario-logado').then(usuario_logado => {
      this.usuario_logado = usuario_logado['usuario'];
      this.getAtividadesLux();
    });
  }
  getAtividadesLux() {
    this.api.get('legiao/get_atividades_lux?capitulo=' + this.usuario_logado['capitulo']).then(atividades => {
      this.atividades = atividades['atividades'];
    }).catch(error => {
      console.log(error);
    });
  }
}
