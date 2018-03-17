import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import {FichasTodasPage,FichasRepetidasPage, FichasFaltantesPage} from "../index.paginas";
import { Seccion } from "../../interfaces/seccion.interface";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  seccion = {} as Seccion;
  tab1:any;
  tab2:any;
  tab3:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tab1 = FichasTodasPage;
    this.tab2 = FichasRepetidasPage;
    this.tab3 = FichasFaltantesPage;

    console.log(this.navParams);
    this.seccion = this.navParams.get('seccion');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');

  }

}
