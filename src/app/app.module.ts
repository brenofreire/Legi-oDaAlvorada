import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LegiaoPage } from '../pages/legiao/legiao';
import { LuxPage } from '../pages/lux/lux';
import { ApiProvider } from '../providers/api/api';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { UserPage } from '../pages/home/user/user';
import { ToolsProvider } from '../providers/tools/tools';
import { UserCadastrosPage } from '../pages/home/user/user-cadastros/user-cadastros';
import { AdicionarParticipantePage } from '../pages/legiao/atividades/adicionar-participante/adicionar-participante';
import { AtividadesProvider } from '../providers/atividades/atividades';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    LegiaoPage,
    LuxPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    LegiaoPage,
    LuxPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    ToolsProvider,
    AtividadesProvider
  ]
})
export class AppModule {}
