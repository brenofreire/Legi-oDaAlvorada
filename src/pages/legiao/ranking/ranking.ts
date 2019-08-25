import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiProvider } from '../../../providers/api/api';
import { Storage } from '@ionic/storage';
import { ToolsProvider } from '../../../providers/tools/tools';


@IonicPage()
@Component({
  selector: 'page-ranking',
  templateUrl: 'ranking.html',
})
export class RankingPage {

  public usuario_logado = null;
  public demolays = null;
  public page_options = {
    carregando: true,
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public tools: ToolsProvider,
  ) {
  }  
  async ionViewDidLoad() {
    this.usuario_logado = await this.tools.getUsuarioLogado();
    if (this.usuario_logado)
      this.storage.get('usuario-logado').then((retorno) => {
        this.usuario_logado = retorno['usuario'];
        this.buscaRanking();
      });
  }
  async buscaRanking(e?) {
    let loading = this.loadingCtrl.create({
      content: 'Carregando ranking...'
    }); loading.present();
    if (this.usuario_logado)
      this.api.get('legiao/ranking_capitulo?capitulo=' + this.usuario_logado['capitulo']).then(demolays => {
        this.demolays = JSON.parse(JSON.stringify(demolays));
        console.log(this.demolays);
        this.page_options.carregando = false;
        loading.dismiss();
      }).catch(() => {
        this.page_options.carregando = false;
        loading.dismiss();
      });
  }
  objectKeys(obj) {
    return Object.keys(obj);
  }
}
