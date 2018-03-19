import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SECCIONES } from "../../data/data.secciones";
import { Seccion } from "../../interfaces/seccion.interface";

import { TabsPage } from "../index.paginas";
import { Album } from "../../interfaces/album.interface";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  secciones: Seccion [] = [];
  album:Album;

  constructor(public navCtrl: NavController, private navParams: NavParams) {
      this.album = this.navParams.get("album");
      this.secciones = this.album.seccion;
  }

  irStickers(seccion:Seccion){
    console.log(seccion);
    this.navCtrl.push(TabsPage, {'seccion':seccion, 'album':this.album});
  }
}
