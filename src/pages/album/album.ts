import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage, LoginPage} from "../index.paginas";

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

    cerrarSesion(){
      console.log('Entre a cerrar sesion');
      this._ajustes.ajustes.mostrar_login=false;
      this._ajustes.ajustes.id_usuario=null;
      this._ajustes.ajustes.token=null;
      this._ajustes.ajustes.estado_usuario=null
      this._ajustes.ajustes.idioma=null;
      this._ajustes.ajustes.mostrar_configuracion=true;
      // Guarda en el storage la info
    //  this._ajustes.guardar_storage();
    //  this._ajustes.eliminar_storage();
      // Establece como Root de la pagina inicial

      this.navCtrl.setRoot(LoginPage);

      console.log('sali cerrar sesion 1');



    }



siguiente_pagina(infiniteScroll){
//  this._albumes.cargar_todos().then(()=>{
  //  infiniteScroll.complete();
//  })
}


}
