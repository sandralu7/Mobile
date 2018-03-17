import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {IntercambioPage} from "../index.paginas";


@Component({
  selector: 'page-fichas-repetidas',
  templateUrl: 'fichas-repetidas.html',
})
export class FichasRepetidasPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FichasRepetidasPage');
  }

  navegarIntercambio(){
    this.navCtrl.push(IntercambioPage);
  }
}
