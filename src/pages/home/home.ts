import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SECCIONES } from "../../data/data.secciones";
import { Seccion } from "../../interfaces/seccion.interface";

import { TabsPage } from "../index.paginas";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  secciones: Seccion [] = [];

  constructor(public navCtrl: NavController, private navParams: NavParams) {
      console.log(navParams);
      this.secciones = this.navParams.get("seccion");
  }

  irStickers(seccion:Seccion){
    console.log(seccion);
    this.navCtrl.push(TabsPage, {'seccion':seccion});
  }
}
