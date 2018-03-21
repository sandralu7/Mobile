import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage, LoginPage } from "../index.paginas";

import { AlbumProvider } from "../../providers/album/album";
import { Album } from "../../interfaces/album.interface";
import { URL_IMAGENES} from "../../config/url.servicios";

//providers
import { AjustesProvider } from "../../providers/ajustes/ajustes";


@Component({
  selector: 'page-album',
  templateUrl: 'album.html',
})
export class AlbumPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _albumes:AlbumProvider, public _ajustes: AjustesProvider) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlbumPage');
  }

  navegarPaginaSecciones(album:Album){

    this.navCtrl.push(TabsPage, {'album': album});
  //  this.navCtrl.push(HomePage, {'album': album});
  }

  cerrarSesion(){
    this._ajustes.ajustes.mostrar_login=false;
    this._ajustes.eliminar_storage();
    // Establece como Root de la pagina inicial
    this.navCtrl.setRoot(LoginPage);

  }

siguiente_pagina(infiniteScroll){
//  this._albumes.cargar_todos().then(()=>{
  //  infiniteScroll.complete();
//  })
}


}
