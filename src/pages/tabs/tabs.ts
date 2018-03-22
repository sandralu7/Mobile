import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import {CuentaPage, HomePage,FichasRepetidasPage, FichasFaltantesPage} from "../index.paginas";
import { Seccion } from "../../interfaces/seccion.interface";
import { Album } from "../../interfaces/album.interface";

import { AjustesProvider } from "../../providers/ajustes/ajustes";
import {MSJ_TABS, MSJ_GENERALES} from "../../data/data.mensajes";

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

  mensajesPagina: any;
  mensajesGenerales: any;

  constructor(public navCtrl: NavController, public navParams: NavParams
            , public _ajustes: AjustesProvider) {
    this.tab1 = CuentaPage;
    this.tab2 = HomePage;
    this.tab3 = FichasRepetidasPage;
    this.tab4 = FichasFaltantesPage;

    console.log(this.navParams);
    this.album = this.navParams.get("album");

    this.mensajesGenerales = MSJ_GENERALES;
    this.mensajesPagina = MSJ_TABS;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');

  }

}
