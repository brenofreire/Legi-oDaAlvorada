import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ModalController, ActionSheetController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../../../providers/api/api';
import { ToolsProvider } from '../../../../providers/tools/tools';

@IonicPage()
@Component({
  selector: 'page-atividade-single',
  templateUrl: 'atividade-single.html',
})
export class AtividadeSinglePage {

  public atividade;
  public page_options = {
    search_bar: true,
    carregando: true,
  }
  public usuario_logado;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    public banco: Storage,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public tools: ToolsProvider
  ) {
    this.atividade = this.navParams.get('atividade');
  }
  async ionViewWillEnter(){
    this.usuario_logado = await this.tools.getUsuarioLogado();
    if(this.usuario_logado) this.carregarParticipantes();
  }
  carregarParticipantes() {
    this.api.get('/legiao/get_usuarios_legiao?atividade=' + this.atividade.id).then(participantes => {
      this.atividade['participantes'] = participantes['usuarios_remover'];
      console.log(this.atividade['participantes']);      
      this.page_options.carregando = false;
    }).catch(() => { this.atividade['participantes'] = null; this.page_options.carregando = false; });
  }
  exibirOpcoesAtividade() {
    let modal_adicionar_participante = this.modalCtrl.create('AdicionarParticipanteAtividade', {
      atividade: this.atividade,
    });
    modal_adicionar_participante.present();
  }
}
