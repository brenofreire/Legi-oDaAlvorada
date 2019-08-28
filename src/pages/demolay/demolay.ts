import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-demolay',
  templateUrl: 'demolay.html',
})
export class DemolayPage {

  public demolay;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
    this.demolay = this.navParams.get('demolay');
    console.log(this.demolay);
  }

}
