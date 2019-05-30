import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdicionarParticipantePage } from './adicionar-participante';

@NgModule({
  declarations: [
    AdicionarParticipantePage,
  ],
  imports: [
    IonicPageModule.forChild(AdicionarParticipantePage),
  ],
})
export class AdicionarParticipantePageModule {}
