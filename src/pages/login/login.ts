import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AlbumPage, RegistroPage } from "../index.paginas";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  navegarPaginaAlbumes(){
    this.navCtrl.push(AlbumPage);
  }

  navegarPaginaRegistro(){
    this.navCtrl.push(RegistroPage);
  }

}
