import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ModalController, ActionSheetController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-atividade-single',
  templateUrl: 'atividade-single.html',
})
export class AtividadeSinglePage {

  public atividade;
  public page_options = {
    search_bar: true,
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public api: ApiProvider,
    public banco: Storage,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController
  ) {
    this.atividade = this.navParams.get('atividade');
  }
  exibirOpcoesAtividade(){
    let modal_adicionar_participante = this.modalCtrl.create('AdicionarParticipanteAtividade', {
      atividade: this.atividade,
    });
    modal_adicionar_participante.present();
  }
}
