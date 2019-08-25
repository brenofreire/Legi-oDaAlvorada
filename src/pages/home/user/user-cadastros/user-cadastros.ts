import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { ApiProvider } from '../../../../providers/api/api';
import { Storage } from '@ionic/storage';
import { ToolsProvider } from '../../../../providers/tools/tools';

@IonicPage()
@Component({
  selector: 'page-user-cadastros',
  templateUrl: 'user-cadastros.html',
})
export class UserCadastrosPage {

  public usuarios: any;
  public usuario_logado;
  public page_options = {
    loaded: false,
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    public toastCtrl: ToastController,
    public banco: Storage,
    public tools: ToolsProvider,
    public alertCtrl: AlertController,
  ) { }
  async ionViewDidEnter() {
    this.usuario_logado = await this.tools.getUsuarioLogado();
    if (this.usuario_logado) this.get_usuarios_temporarios(this.usuario_logado['capitulo']);
  }
  get_usuarios_temporarios(capitulo) {
    this.api.get('conta/get_usuarios_temporarios?capitulo=' + capitulo).then(usuarios_temporarios => {
      this.usuarios = usuarios_temporarios;
      this.usuarios = this.usuarios.length ? this.usuarios : false;

      this.page_options.loaded = true;
    }).catch(error => {
      this.usuarios = false;
      this.page_options.loaded = true;
    });
  }
  async modificarStatusUsuario(status, usuario) {
    let body = {
      status: status,
      usuario: usuario
    }
    let continuar = true;
    let modificar = () => {
      this.api.post('conta/modificar_usuario_temporario', body).then(status_alterado => {
        for (let usuario of this.usuarios)
          if (usuario['cid'] == status_alterado['cid']) usuario['status'] = body.status;
      }).catch(error => {
        this.alertCtrl.create({
          title: 'Houve um erro ao alterar status de usuário',
          subTitle: 'Tente novamente mais tarde',
          buttons: ['OK']
        });
      });
    }
    if (status == 2) {
      let alert = this.alertCtrl.create({
        title: 'Deseja realmente apagar essa solicitação?',
        subTitle: 'Essa ação NÃO poderá ser desfeita.',
        buttons: [{
          text: 'Não reprovar',
          handler: () => { alert.dismiss(); return false; }
        }, {
          text: 'Reprovar solicitação',
          handler: () => { modificar(); }
        }]
      }); alert.present();
    } else modificar();

  }
}
