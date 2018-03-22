import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SECCIONES } from "../../data/data.secciones";
import { Seccion } from "../../interfaces/seccion.interface";

import { FichasTodasPage } from "../index.paginas";
import { Album } from "../../interfaces/album.interface";

import { AjustesProvider } from "../../providers/ajustes/ajustes";
import {MSJ_SECCION, MSJ_GENERALES} from "../../data/data.mensajes";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  secciones: Seccion [] = [];
  album:Album;
  mensajesPagina: any;
  mensajesGenerales: any;

  constructor(public navCtrl: NavController, private navParams: NavParams
      , public _ajustes: AjustesProvider) {
      //this.album = this.navParams.get("album");
      this.album = this.navParams.data;
      this.secciones = this.album.seccion;
      this.mensajesGenerales = MSJ_GENERALES;
      this.mensajesPagina = MSJ_SECCION;
  }

  irStickers(seccion:Seccion){
    console.log(seccion);
    this.navCtrl.push(FichasTodasPage, {'seccion':seccion, 'album':this.album});
  }
}
