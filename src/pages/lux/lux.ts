import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';
import { AtividadesProvider } from '../../providers/atividades/atividades';

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
  ) {
  }

  ionViewDidEnter() {
    this.banco.get('usuario-logado').then(usuario_logado => {
      this.usuario_logado = usuario_logado['usuario'];
      if (usuario_logado)
        this.getAtividadesLux();
      else {
        let modal_user = this.modalCtrl.create("UserPage", {}, {
          enableBackdropDismiss: false,              
        });
        modal_user.present();
        modal_user.onDidDismiss(usuario_logado => {
          if (usuario_logado) this.usuario_logado = usuario_logado;
        });
      }
    });
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
    this.atividadesProvider.opcoesAtividade({ atividade: atividade, role: this.usuario_logado.role }).then(retorno => {
      this.navCtrl.push(retorno['role_options']['page'], {
        atividade: atividade
      });
    });
  }
}
