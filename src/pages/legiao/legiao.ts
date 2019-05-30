import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-legiao',
  templateUrl: 'legiao.html',
})
export class LegiaoPage {

  public usuario_logado;
  public atividades;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    public banco: Storage,
    public actionSheetCtrl: ActionSheetController
  ) {
  }
  ionViewDidEnter() {
    this.banco.get('usuario-logado').then(usuario_logado => {
      this.usuario_logado = usuario_logado['usuario'];
      this.getAtividadesCapitulo();
    });
  }
  getAtividadesCapitulo() {
    this.api.get('legiao/get_atividades_legiao?capitulo=' + this.usuario_logado['capitulo']).then(atividades => {
      this.atividades = atividades['atividades'];
    }).catch(error => {
      console.log(error);
    });
  }
  opcoesAtividade(atividade) {
    if (Number(this.usuario_logado.role) >= 4) {
      this.opcoesSuperadmin(atividade);
    } else {
      // this.opcoesRegular();
    }
  }
  opcoesSuperadmin(atividade) {
    let role_options;
    if (Number(this.usuario_logado.role) >= 5) {
      role_options = {
        text: 'Participantes',
        page: 'AdicionarParticipantePage',
      }
    } else {
        role_options = {
          text: 'Abrir atividade',
          page: 'AtividadeSinglePage',
        }
    }
    let action_sheet_superadmin = this.actionSheetCtrl.create({
      title: 'Opções',
      buttons: [
        {
          text: role_options['text'],
          handler: () => {
            this.navCtrl.push(String(role_options['page']), { atividade: atividade });
          }
        },

        {
          text: 'Editar',
          handler: () => { }
        }
      ]
    });
    action_sheet_superadmin.present();
  }
}
