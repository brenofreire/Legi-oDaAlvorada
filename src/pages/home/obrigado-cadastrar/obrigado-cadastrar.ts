import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiProvider } from '../../../providers/api/api';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home';

@IonicPage()
@Component({
  selector: 'page-obrigado-cadastrar',
  templateUrl: 'obrigado-cadastrar.html',
})
export class ObrigadoCadastrarPage {

  private login;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public api: ApiProvider,
    public storage: Storage,
    public alertCtrl: AlertController,
  ) {
    this.storage.get('usuario-cadastro').then(data => {
      this.login = data;
    });
  }

  ionViewDidLoad() {
    
  }
  verificarConta(){
    this.api.get('conta/verificar_status/' + this.login.cid).then(data => {
      if(data['status'] == 1){
        this.storage.set('usuario-cadastro', null);        
        this.navCtrl.pop();
      } else {
        let alert_conta_inativa = this.alertCtrl.create({
          title: 'Eita!',
          subTitle: 'Sua conta ainda não foi confirmada.',
          message: 'O seu cadastro ainda não foi aprovado pela diretoria de seu capítulo.',
          buttons: ['OK']
        });
        alert_conta_inativa.present();}
    }).catch(error => {
      console.log(error);
    });
  }
}
