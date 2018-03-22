import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AlbumPage, RegistroPage } from "../index.paginas";
import { Http, URLSearchParams} from '@angular/http';

//providers
import { AjustesProvider } from "../../providers/ajustes/ajustes";
import { LoadingController, AlertController} from 'ionic-angular';
import 'rxjs/add/operator/map'

import {MSJ_LOGIN} from "../../data/data.mensajes";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  correo:string = "";
  contrasena:string = "";
  mensajes: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private _ajustes: AjustesProvider,
    public loadingCtrl: LoadingController,
    public http : Http,
    private alertController:AlertController) {
      this.mensajes = MSJ_LOGIN;
  }

  navegarPaginaAlbumes(){
    this.navCtrl.push(AlbumPage);
  }

  navegarPaginaRegistro(){
    this.navCtrl.push(RegistroPage);
  }

  loginUsuario(){

    if(this.correo == "" || this.correo.length==0){
      // Crea una alerta informando el error
      this.alertController.create({
        title:"Error ",
        subTitle: "Ingrese Correo",
        buttons: ["OK"]
      }).present()
      return;
    }
    if(this.contrasena == "" || this.contrasena.length==0){
      // Crea una alerta informando el error
      this.alertController.create({
        title:"Error ",
        subTitle: "Ingrese Contraseña",
        buttons: ["OK"]
      }).present()
      return;
    }

    this.ingresar().subscribe( ()=>{})

  }

  saltarLogin(){
    this._ajustes.ajustes.mostrar_login=false;
    this._ajustes.guardar_storage();
  }

  ingresar(){
    // Genara la peticion por medio de los parametros
    let data=new URLSearchParams();
    data.append("USUA_CORREO", this.correo);
    data.append("USUA_CLAVE", this.contrasena);

    let url="http://www.fingergroup.com.co/rest/index.php/usuario/login_usuario_geo/";

    // Se crea un loadiog con el fin de que verifique el usuario
    let loader = this.loadingCtrl.create({
           content: "Espere por favor",
     });
    loader.present();

    // Realiza la peticion por medio de una promesa
    return this.http.post(url,data)
            .map( resp=>{
              let data_resp=resp.json();
              loader.dismiss();// Cierra el loading por que ya hizo la peticion
              if(data_resp.error){// Si gubo un error
                    this.correo="";
                    this.contrasena="";
                    this._ajustes.ajustes.mostrar_login=true;
                    // Crea una alerta informando el error
                    this.alertController.create({
                      title:"Error al iniciar ",
                      subTitle: data_resp.mensaje,
                      buttons: ["OK"]
                    }).present()
              }else{
                    // Guadra la informacion retornada
                    this._ajustes.ajustes.mostrar_login=false;
                    this._ajustes.ajustes.id_usuario=data_resp.id_usuario;
                    this._ajustes.ajustes.token=data_resp.token;
                    // Guarda en el storage la info
                    this._ajustes.guardar_storage();
                    // Hace root la paginainicial
                  //  this.navCtrl.setRoot(MenuInicialPage);
                    this.navCtrl.setRoot(AlbumPage);
              }

            } )



  }

}
