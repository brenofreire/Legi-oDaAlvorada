import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActionSheetController, NavController, App } from 'ionic-angular';

@Injectable()
export class AtividadesProvider {

  constructor(
    public http: HttpClient,
    public actionSheetCtrl: ActionSheetController,
  ) {}
  opcoesAtividade({ atividade, role }) {
    return new Promise((response) => {
      let role_options;
      if (Number(role) >= 5) {
        role_options = {
          text: 'Participantes',
          page: 'AdicionarParticipantePage',
          icon: 'person-add',
        }
      } else {
        role_options = {
          text: 'Abrir atividade',
          page: 'AtividadeSinglePage',
          icon: 'open'
        }
      }
      this.actionSheetCtrl.create({
        title: 'Opções',
        buttons: [
          {
            text: role_options['text'],
            icon: role_options['icon'],
            handler: () => {
              response({
                role_options: role_options,
                atividade: atividade,
              });
            }
          }
        ]
      }).present();
    })
  }
}
