import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ApiProvider } from '../../../../providers/api/api';
import { Storage } from '@ionic/storage';
import { ToolsProvider } from '../../../../providers/tools/tools';

@IonicPage()
@Component({
  selector: 'page-superadmin',
  templateUrl: 'superadmin.html',
})
export class SuperadminPage {
  public buscaValor = '';
  public usuario_logado;
  public usuarios;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public api: ApiProvider,
    public banco: Storage,
    public modalCtrl: ModalController,
    public tools: ToolsProvider,
  ) { }

  ionViewDidLoad() {
  }
  async ionViewWillEnter(){
    this.usuario_logado = await this.tools.getUsuarioLogado();
  }
  ionViewDidEnter(){
    this.api.get('conta/get_usuarios_geral?capitulo=' + this.usuario_logado['capitulo'] + '&buscaValor=' + this.buscaValor).then(retorno => {
      this.usuarios = retorno;
    });
  }
}
