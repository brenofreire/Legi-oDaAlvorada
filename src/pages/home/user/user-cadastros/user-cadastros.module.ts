import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserCadastrosPage } from './user-cadastros';

@NgModule({
  declarations: [
    UserCadastrosPage,
  ],
  imports: [
    IonicPageModule.forChild(UserCadastrosPage),
  ],
})
export class UserCadastrosPageModule {}
