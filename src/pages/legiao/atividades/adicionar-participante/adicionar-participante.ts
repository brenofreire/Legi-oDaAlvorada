import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-adicionar-participante',
  templateUrl: 'adicionar-participante.html',
})
export class AdicionarParticipantePage {

  public page_options = {
    search_bar: true,
    participantes_segment: 'adicionar',
    usuarios_carregados: false
  }
  public atividade;
  public usuarios: any;
  public usuarios_remover: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public api: ApiProvider,
    public toastCtrl: ToastController,
  ) {
    this.atividade = this.navParams.get('atividade');
  }
  getUsuarios() {
    this.api.get('conta/get_usuarios_legiao?capitulo=' + this.atividade.capitulo + '&atividade=' + this.atividade.id ).then(usuarios => {
      this.usuarios = usuarios['usuarios'];
      this.usuarios_remover = usuarios['usuarios_remover'];
      this.page_options.usuarios_carregados = true;
    });
  }
  ionViewWillEnter() {
    this.getUsuarios();
    this.page_options.participantes_segment = 'adicionar'
  }
  alterarStatusUsuarioAtividade(acao, usuario){
    // Criar enddpoint para adicionar ou remover usuário.
    let obj = {
      atividade: this.atividade['id'],
      pontuacao: this.atividade['pontuacao'],
      id: usuario['CID'],
      capitulo: usuario['capitulo'],
      role: usuario['role'],
      acao: acao,
    }
    this.api.post('legiao/registrar_participante', obj).then(adicionar => {
      this.getUsuarios();
    }).catch(error => {
      let toast_erro_adicionar = this.toastCtrl.create({
        message: 'Erro ao mudar status do participante',
        position: 'bottom',
        duration: 3000,
      });
      toast_erro_adicionar.present();
    });
  }
}
