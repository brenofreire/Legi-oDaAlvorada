import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-legiao',
  templateUrl: 'legiao.html',
})
export class LegiaoPage {

  public usuario_logado;
  public atividades;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    public banco: Storage,
  ) {
  }
  ionViewDidEnter() {
    this.banco.get('usuario-logado').then(usuario_logado => {
      this.usuario_logado = usuario_logado['usuario'];
      this.getAtividadesCapitulo();
    });
  }
  getAtividadesCapitulo() {
    this.api.get('legiao/get_atividades_legiao?capitulo=' + this.usuario_logado['capitulo']).then(atividades => {
      this.atividades = atividades['atividades'];
    }).catch(error => {
      console.log(error);
    });
  }
}
