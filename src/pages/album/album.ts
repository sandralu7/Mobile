import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage, LoginPage, ConfiguracionPage } from "../index.paginas";

import { AlbumProvider } from "../../providers/album/album";
import { Album } from "../../interfaces/album.interface";
import { URL_IMAGENES} from "../../config/url.servicios";

//providers
import { AjustesProvider } from "../../providers/ajustes/ajustes";
import {MSJ_ALBUMES, MSJ_GENERALES} from "../../data/data.mensajes";

@Component({
  selector: 'page-album',
  templateUrl: 'album.html',
})
export class AlbumPage {

  mensajesPagina: any;
  mensajesGenerales: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _albumes:AlbumProvider, public _ajustes: AjustesProvider) {
        this.mensajesGenerales = MSJ_GENERALES;
        this.mensajesPagina = MSJ_ALBUMES;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlbumPage');
  }

  navegarPaginaSecciones(album:Album){

    this.navCtrl.push(TabsPage, {'album': album});
  //  this.navCtrl.push(HomePage, {'album': album});
  }



siguiente_pagina(infiniteScroll){
//  this._albumes.cargar_todos().then(()=>{
  //  infiniteScroll.complete();
//  })
}


}
