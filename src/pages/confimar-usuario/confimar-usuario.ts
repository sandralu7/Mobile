import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, URLSearchParams} from '@angular/http';

import {MSJ_VERIFICACION, MSJ_GENERALES} from "../../data/data.mensajes";
import { LoginPage, AlbumPage } from "../index.paginas";
import { URL_SERVICIOS} from "../../config/url.servicios";

//providers
import { AjustesProvider } from "../../providers/ajustes/ajustes";
import { LoadingController, AlertController} from 'ionic-angular';

/**
 * Generated class for the ConfimarUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confimar-usuario',
  templateUrl: 'confimar-usuario.html',
})
export class ConfimarUsuarioPage {

  mensajes: any;
  mensajesGenerales: any;
  codigo:any;

  constructor(public navCtrl: NavController, public navParams: NavParams ,private _ajustes: AjustesProvider,  public loadingCtrl: LoadingController,
    public http : Http,
    private alertController:AlertController) {
      this.mensajes = MSJ_VERIFICACION;
      this.mensajesGenerales=MSJ_GENERALES;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfimarUsuarioPage');
  }

  cancelarCodigo(){
    this.navCtrl.setRoot(LoginPage);
  }

  verificarCodigo(){

    if(this.codigo == "" || this.codigo.length==0){
      // Crea una alerta informando el error
      if(this._ajustes.ajustes.idioma=='E'){

          this.alertController.create({
            title:"Error ",
            subTitle: this.mensajes.ingreseCodigo,
            buttons: ["OK"]
          }).present()
          return;
      }
      else{
        this.alertController.create({
          title:"Error ",
          subTitle: this.mensajes.ingreseCodigoIng,
          buttons: ["OK"]
        }).present()
        return;
      }

    }


    this.verificar().subscribe( ()=>{})

  }

  verificar(){
    // Genara la peticion por medio de los parametros
    let data=new URLSearchParams();
    data.append("USUA_CODIGOVERIFICACION", this.codigo);
    data.append("USUA_ID", this._ajustes.ajustes.id_usuario);

    let url = URL_SERVICIOS + "/usuario/validar_verificacion_usuario_geo/";

    // Se crea un loading con el fin de que verifique el usuario
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
              if(data_resp.error){// Si hubo un error
                    if(this._ajustes.ajustes.idioma=='E'){
                      this.alertController.create({
                      title:"Error",
                      subTitle: this.mensajes.codigoError,
                      buttons: ["OK"]
                    }).present()

                  }else{
                    this.alertController.create({
                    title:"Error",
                    subTitle: this.mensajes.codigoErrorIng,
                    buttons: ["OK"]
                  }).present()

                 }
              }else{
                    // Guadra la informacion retornada
                    this._ajustes.ajustes.estado_usuario=1;
                    // Guarda en el storage la info
                    this._ajustes.guardar_storage();
                    // Hace root la paginainicial
                  //  this.navCtrl.setRoot(MenuInicialPage);
                      this.navCtrl.setRoot(AlbumPage);


              }

            } )



  }



}
