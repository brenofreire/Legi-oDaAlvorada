import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ModalController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';
import { AtividadesProvider } from '../../providers/atividades/atividades';
import { ToolsProvider } from '../../providers/tools/tools';


@IonicPage()
@Component({
  selector: 'page-legiao',
  templateUrl: 'legiao.html',
})
export class LegiaoPage {

  public usuario_logado;
  public atividades;
  public carregando = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    public banco: Storage,
    public actionSheetCtrl: ActionSheetController,
    public atividadesProvider: AtividadesProvider,
    public modalCtrl: ModalController,
    public tools: ToolsProvider,
  ) {
  }  
  async ionViewDidEnter() {
    this.usuario_logado = await this.tools.getUsuarioLogado();
    if(this.usuario_logado) this.getAtividadesCapitulo();
  }
  getAtividadesCapitulo() {
    this.api.get('legiao/get_atividades_legiao?capitulo=' + this.usuario_logado['capitulo']).then(atividades => {
      this.atividades = atividades['atividades'];
      this.carregando = false;
    }).catch(error => {
      this.atividades = null;
      console.log(error);
      this.carregando = false;
    });
  }
  opcoesAtividade(atividade) {
    this.atividadesProvider.opcoesAtividade({ role: this.usuario_logado.role }).then(retorno  => {
      this.navCtrl.push(retorno.toString(), { atividade: atividade });
    });
  }
  opcoesLegiao() {
    let action_sheet_opcoes_legiao = this.actionSheetCtrl.create({
      title: 'Opções',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }
      ]
    });
    action_sheet_opcoes_legiao.present();
  }
}
