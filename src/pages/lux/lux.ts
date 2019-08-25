import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';
import { AtividadesProvider } from '../../providers/atividades/atividades';
import { ToolsProvider } from '../../providers/tools/tools';

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
  public atividades = null;
  public page_options = {
    carregando: true,
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    public banco: Storage,
    public loadingCtrl: LoadingController,
    public atividadesProvider: AtividadesProvider,
    public modalCtrl: ModalController,
    public tools: ToolsProvider,
  ) {
  }

  async ionViewDidEnter() {
    this.usuario_logado = await this.tools.getUsuarioLogado();
    if(this.usuario_logado) this.getAtividadesLux();
  }
  getAtividadesLux() {
    this.api.get('legiao/get_atividades_lux?capitulo=' + this.usuario_logado['capitulo']).then(atividades => {
      this.atividades = atividades['atividades'];
      this.page_options.carregando = false;
    }).catch(error => {
      console.log(error);
      this.page_options.carregando = false;
    });
  }
  opcoesAtividade(atividade) {
    this.atividadesProvider.opcoesAtividade({ role: this.usuario_logado.role }).then(retorno => {
      this.navCtrl.push(retorno.toString(), {
        atividade: atividade
      });
    });
  }
}
