import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UsuarioProvider} from "../../providers/usuario/usuario";

import { AjustesProvider } from "../../providers/ajustes/ajustes";
import {MSJ_CUENTA, MSJ_GENERALES} from "../../data/data.mensajes";

import { ConfiguracionPage } from "../index.paginas";

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

  cerrarSesion(){
    console.log('Entre a cerrar sesion');
    this._ajustes.ajustes.mostrar_login=false;
    this._ajustes.ajustes.id_usuario=null;
    this._ajustes.ajustes.token=null;
    this._ajustes.ajustes.estado_usuario=null
    this._ajustes.ajustes.idioma=null;
    this._ajustes.ajustes.mostrar_configuracion=true;
    // Guarda en el storage la info
    this._ajustes.guardar_storage();
    this._ajustes.eliminar_storage();
    // Establece como Root de la pagina inicial

    this.navCtrl.setRoot(ConfiguracionPage);

    console.log('sali cerrar sesion 1');



  }

}
