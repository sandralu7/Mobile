import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from "../index.paginas";

import { AlbumProvider } from "../../providers/album/album";
import { Album } from "../../interfaces/album.interface";


@Component({
  selector: 'page-album',
  templateUrl: 'album.html',
})
export class AlbumPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _albumes:AlbumProvider) {
        _albumes.cargar_todos2();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlbumPage');
  }

  navegarPaginaSecciones(album:Album){

    this.navCtrl.push(HomePage, {'seccion': album.seccion});
  }

siguiente_pagina(infiniteScroll){
  this._albumes.cargar_todos().then(()=>{
    infiniteScroll.complete();
  })
}

}
