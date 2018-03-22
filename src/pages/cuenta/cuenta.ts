import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UsuarioProvider} from "../../providers/usuario/usuario";

import { AjustesProvider } from "../../providers/ajustes/ajustes";
import {MSJ_CUENTA, MSJ_GENERALES} from "../../data/data.mensajes";

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


  mensajesPagina: any;
  mensajesGenerales: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _usuario: UsuarioProvider, public _ajustes: AjustesProvider) {
              console.log("USUARIO PROVIDER desde cueta");
              console.log(this._usuario.usuario);
              this.mensajesGenerales = MSJ_GENERALES;
              this.mensajesPagina = MSJ_CUENTA;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CuentaPage');
  }
  ionViewWillEnter(){
    this._usuario.consultarUsuario();
  }

}
