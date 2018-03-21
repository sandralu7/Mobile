import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import {CuentaPage, HomePage,FichasRepetidasPage, FichasFaltantesPage} from "../index.paginas";
import { Seccion } from "../../interfaces/seccion.interface";
import { Album } from "../../interfaces/album.interface";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  album = {} as Album;
  
  tab1:any;
  tab2:any;
  tab3:any;
  tab4:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tab1 = CuentaPage;
    this.tab2 = HomePage;
    this.tab3 = FichasRepetidasPage;
    this.tab4 = FichasFaltantesPage;

    console.log(this.navParams);
    this.album = this.navParams.get("album");


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');

  }

}
