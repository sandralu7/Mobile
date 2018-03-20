import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IntercambiosProvider } from "../../providers/intercambios/intercambios";

@Component({
  selector: 'page-intercambio',
  templateUrl: 'intercambio.html',
})
export class IntercambioPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _intercambios:IntercambiosProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntercambioPage');
  }

}
