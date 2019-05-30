import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController } from 'ionic-angular';
import { ApiProvider } from '../../../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-adicionar-participante',
  templateUrl: 'adicionar-participante.html',
})
export class AdicionarParticipantePage {

  public page_options = {
    search_bar: true,
    participantes_segment: 'adicionar'
  }
  public atividade;
  public usuarios: any;
  public usuarios_remover: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public api: ApiProvider
  ) {
    this.atividade = this.navParams.get('atividade');
  }
  getUsuarios() {
    this.api.get('conta/get_usuarios_legiao?capitulo=' + this.atividade.capitulo + '&atividade=' + this.atividade.id ).then(usuarios => {
      this.usuarios = usuarios['usuarios'];
      this.usuarios_remover = usuarios['usuarios_remover'];
    });
  }
  ionViewWillEnter() {
    this.getUsuarios();
    this.page_options.participantes_segment = 'adicionar'
  }
  alterarStatusUsuarioAtividade(){
    // Criar enddpoint para adicionar ou remover usuário.
  }
}
