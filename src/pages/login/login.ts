import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AlbumPage, RegistroPage,ConfimarUsuarioPage, OlvidoContraseniaPage } from "../index.paginas";
import { Http, URLSearchParams} from '@angular/http';
import { URL_SERVICIOS} from "../../config/url.servicios";

import { Geolocation } from '@ionic-native/geolocation';

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
  longitud:any;
  latitud:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private _ajustes: AjustesProvider,
    public loadingCtrl: LoadingController,
    public http : Http,
    private alertController:AlertController, private geolocation: Geolocation) {
      this.mensajesPagina = MSJ_LOGIN;
      this.mensajesGenerales = MSJ_GENERALES;
      this.mensajesRegistro= MSJ_REGISTRO;
      console.log("Entro login constructor");
      console.log(this._ajustes.ajustes);
      console.log("Correo Stotage constructor: "+this._ajustes.ajustes.correo_usuario);
      this.correo=this._ajustes.ajustes.correo_usuario;
      this.contrasena=this._ajustes.ajustes.clave_usuario;
      this.obtenerCoordenadas();
  }

  navegarPaginaAlbumes(){
    this.navCtrl.push(AlbumPage);
  }

  ionViewWillEnter(){
    console.log("Entro login");
    console.log(this._ajustes.ajustes);
    console.log("Correo Stotage: "+this._ajustes.ajustes.correo_usuario);
    this.correo=this._ajustes.ajustes.correo_usuario;
    this.contrasena=this._ajustes.ajustes.clave_usuario;
  }

  navegarPaginaRegistro(){
    if (this._ajustes.ajustes.idioma==''){
             this._ajustes.ajustes.idioma='I';
    }

    this.navCtrl.push(RegistroPage);
  }
  obtenerCoordenadas(){
    console.log('Antes de obtener');
    this.geolocation.getCurrentPosition().then((resp) => {
      this.longitud= resp.coords.longitude;
      this.latitud= resp.coords.latitude;
      console.log('despues de obtener: '+ this.longitud+" ,"+ this.latitud);
     }).catch((error) => {
       this.longitud=null;
       this.latitud=null;
       console.log('Error getting location', error);
     });
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
    //this._ajustes.guardar_storage();
  }

  olvidoContrasenia(){

    this.navCtrl.push(OlvidoContraseniaPage);

  }

  ingresar(){
    // Genara la peticion por medio de los parametros
    let data=new URLSearchParams();
    data.append("USUA_CORREO", this.correo);
    data.append("USUA_CLAVE", this.contrasena);
    if(this._ajustes.banderaAppFree==false){
      data.append("USUA_LATITUD", this.latitud);
      data.append("USUA_LONGITUD", this.longitud);
    }
    let url = URL_SERVICIOS + "/usuario/login_usuario_geo/";

    // Se crea un loadiog con el fin de que verifique el usuario
    let loader;

        loader = this.loadingCtrl.create({
               content: this.mensajesGenerales.espereIngEsp,
         });
         loader.present();



    // Realiza la peticion por medio de una promesa
    return this.http.post(url,data)
            .map( resp=>{
              let data_resp=resp.json();
              loader.dismiss();// Cierra el loading por que ya hizo la peticion
              console.log("Datos login  :"+data_resp);
              console.log("Datos login  :"+resp);
              if(data_resp.error){// Si hubo un error
                    this.correo="";
                    this.contrasena="";
                    this._ajustes.ajustes.mostrar_login=true;
                    this._ajustes.ajustes.estado_usuario=0;
                    console.log('Error Login Usuario');
                    this._ajustes.ajustes.mostrar_login=true;
                    this._ajustes.ajustes.id_usuario=null;
                    this._ajustes.ajustes.token=null;
                    this._ajustes.ajustes.estado_usuario=null
                    this._ajustes.ajustes.idioma=null;

                    // Guarda en el storage la info
                //    this._ajustes.guardar_storage();
                //    this._ajustes.eliminar_storage();


                    // Crea una alerta informando el error
                    this.alertController.create({
                      title:"Error Login ",
                      subTitle: data_resp.mensaje,
                      buttons: ["OK"]
                    }).present()
              }else{
                    // Guadra la informacion retornada
                    this._ajustes.ajustes.mostrar_login=false;
                    this._ajustes.ajustes.id_usuario=data_resp.id_usuario;
                    this._ajustes.ajustes.idioma=data_resp.lenguaje;
                    this._ajustes.ajustes.token=data_resp.token;
                    this._ajustes.ajustes.estado_usuario=data_resp.estado_usuario;
                    this._ajustes.ajustes.correo_usuario=this.correo;
                    this._ajustes.ajustes.clave_usuario=this.contrasena;

                    // Guarda en el storage la info
                    this._ajustes.guardar_storage();
                    // Hace root la paginainicial
                  //  this.navCtrl.setRoot(MenuInicialPage);

                    if(data_resp.estado_usuario==0){ // No esta confirmado l correo
                      this.navCtrl.setRoot(ConfimarUsuarioPage);
                    }else{
                      this.navCtrl.setRoot(AlbumPage);
                    }

              }

            } )



  }

}
