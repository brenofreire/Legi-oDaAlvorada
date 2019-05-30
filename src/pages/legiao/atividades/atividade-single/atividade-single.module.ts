import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AtividadeSinglePage } from './atividade-single';

@NgModule({
  declarations: [
    AtividadeSinglePage,
  ],
  imports: [
    IonicPageModule.forChild(AtividadeSinglePage),
  ],
})
export class AtividadeSinglePageModule {}
