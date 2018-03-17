import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {IntercambioPage} from "../index.paginas";


@Component({
  selector: 'page-fichas-faltantes',
  templateUrl: 'fichas-faltantes.html',
})
export class FichasFaltantesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FichasFaltantesPage');
  }

  navegarIntercambio(){
    this.navCtrl.push(IntercambioPage);
  }

}
