import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../../providers/api/api';
import { ToolsProvider } from '../../../providers/tools/tools';
import { Storage } from '@ionic/storage';
import { HomePage } from '../../home/home';

@IonicPage()
@Component({
  selector: 'page-legiao-nova-tarefa',
  templateUrl: 'legiao-nova-tarefa.html',
})
export class LegiaoNovaTarefaPage {

  public tarefa = {
    nome: '',
    slug: null,
    pontuacao: null,
    cnie: null,
    lux: null,
    capitulo: null,
  }
  public page_options = {
    tipos: [],
    loaded: false,
    retorno_cadastro: {
      ok: false,
      mensagem: null,
    }
  }
  public usuario_logado;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    public toastCtrl: ToastController,
    public tools: ToolsProvider,
    public banco: Storage
  ) {
  }
  
  async ionViewDidLoad() {
    this.usuario_logado = await this.tools.getUsuarioLogado();
    if (this.usuario_logado)
      this.api.get('legiao/get_tipos_tarefa').then(tipos => {
        this.page_options.tipos = tipos['tipos'];
        this.page_options.loaded = true;
      });
  }
  cadastrarTarefa() {
    this.tarefa.slug = this.tools.slugify(this.tarefa.nome);
    this.banco.get('usuario-logado').then(usuario_logado => {
      this.tarefa['capitulo'] = usuario_logado['usuario']['capitulo'];
      this.tarefa['status'] = 1;
      this.api.post('legiao/cadastrar_tarefa', this.tarefa).then(cadastro_tarefa => {
        this.page_options.retorno_cadastro.ok = cadastro_tarefa['ok'];
        this.page_options.retorno_cadastro.mensagem = cadastro_tarefa['mensagem'];
        this.toastCtrl.create({
          message: cadastro_tarefa['mensagem'],
          duration: 3000,
          position: 'top'
        }).present();
      }, error => {
        this.toastCtrl.create({
          message: error['error'],
          duration: 3000,
          position: 'top'
        }).present();
      });
    }).catch(error => {
      console.log(error);
    });
  }
  goToHomePage() {
    this.navCtrl.setRoot(HomePage);
  }
}
