import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActionSheetController } from 'ionic-angular';

@Injectable()
export class AtividadesProvider {

  constructor(
    public http: HttpClient,
    public actionSheetCtrl: ActionSheetController,
  ) { }
  opcoesAtividade({ role }) {
    return new Promise((response) => {
      let buttons = [];
      buttons.push(
        {
          text: 'Abrir atividade',
          icon: 'open',
          handler: () => { response('AtividadeSinglePage'); }
        }
      );
      if (Number(role) >= 5) {
        buttons.push({
          text: 'Participantes',
          icon: 'person-add',
          handler: () => { response('AdicionarParticipantePage'); }
        });
      }
      this.actionSheetCtrl.create({
        title: 'Opções',
        buttons: buttons
      }).present();
    })
  }
}
