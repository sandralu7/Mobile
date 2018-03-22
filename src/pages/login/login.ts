import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AlbumPage, RegistroPage } from "../index.paginas";
import { Http, URLSearchParams} from '@angular/http';
import { URL_SERVICIOS} from "../../config/url.servicios";

//providers
import { AjustesProvider } from "../../providers/ajustes/ajustes";
import { LoadingController, AlertController} from 'ionic-angular';
import 'rxjs/add/operator/map'

import {MSJ_LOGIN, MSJ_GENERALES, MSJ_REGISTRO} from "../../data/data.mensajes";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  correo:string = "";
  contrasena:string = "";
  mensajesPagina: any;
  mensajesGenerales: any;
  mensajesRegistro: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private _ajustes: AjustesProvider,
    public loadingCtrl: LoadingController,
    public http : Http,
    private alertController:AlertController) {
      this.mensajesPagina = MSJ_LOGIN;
      this.mensajesGenerales = MSJ_GENERALES;
      this.mensajesRegistro= MSJ_REGISTRO;
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
      if(this._ajustes.ajustes.idioma=='E'){

          this.alertController.create({
            title:"Error ",
            subTitle: this.mensajesRegistro.ingreseEmail,
            buttons: ["OK"]
          }).present()
          return;
      }
      else{
        this.alertController.create({
          title:"Error ",
          subTitle: this.mensajesRegistro.ingreseEmailIng,
          buttons: ["OK"]
        }).present()
        return;
      }

    }
    if(this.contrasena == "" || this.contrasena.length==0){
      if(this._ajustes.ajustes.idioma=='E'){
      // Crea una alerta informando el error
          this.alertController.create({
            title:"Error ",
            subTitle: this.mensajesRegistro.ingreseContrasenia,
            buttons: ["OK"]
          }).present()
          return;
      }
      else{
        this.alertController.create({
          title:"Error ",
          subTitle: this.mensajesRegistro.ingreseContraseniaIng,
          buttons: ["OK"]
        }).present()
        return;
      }
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

    let url = URL_SERVICIOS + "/usuario/login_usuario_geo/";

    // Se crea un loadiog con el fin de que verifique el usuario
    let loader;
    if(this._ajustes.ajustes.idioma=='E'){
        loader = this.loadingCtrl.create({
               content: this.mensajesGenerales.espere,
         });
         loader.present();
    }else{
        loader = this.loadingCtrl.create({
             content: this.mensajesGenerales.espereIng,
       });
       loader.present();
    }


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
