import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UsuarioProvider} from "../../providers/usuario/usuario";

/**
 * Generated class for the CuentaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cuenta',
  templateUrl: 'cuenta.html',
})
export class CuentaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _usuario: UsuarioProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CuentaPage');
  }

}
