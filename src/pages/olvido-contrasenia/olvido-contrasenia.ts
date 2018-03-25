import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from "../index.paginas";

import { Http, URLSearchParams} from '@angular/http';


import { AjustesProvider } from "../../providers/ajustes/ajustes";
import { LoadingController, AlertController} from 'ionic-angular';
import 'rxjs/add/operator/map'

import {MSJ_LOGIN, MSJ_GENERALES, MSJ_REGISTRO} from "../../data/data.mensajes";

import { URL_SERVICIOS} from "../../config/url.servicios";

/**
 * Generated class for the OlvidoContraseniaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-olvido-contrasenia',
  templateUrl: 'olvido-contrasenia.html',
})
export class OlvidoContraseniaPage {

  correo:string = "";
  mensajesRegistro: any;
    mensajesGenerales: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _ajustes: AjustesProvider,
    public loadingCtrl: LoadingController,
    public http : Http,
    private alertController:AlertController) {

      this.mensajesRegistro= MSJ_REGISTRO;
        this.mensajesGenerales = MSJ_GENERALES;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OlvidoContraseniaPage');
  }

  recordarContrasenia(){
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

      this.enviar().subscribe( ()=>{})

  }

  enviar(){
    // Genara la peticion por medio de los parametros
    let data=new URLSearchParams();
    data.append("SALUDO", "Hola");
    data.append("MENSAJE1", "Su contraseña es");
    data.append("DESPEDIDA", "Gracias");
    data.append("USUA_CORREO", this.correo);
    data.append("ASUNTO", "Recordar Contraseña");


    let url = URL_SERVICIOS + "/usuario/enviar_contrasenia_usuario_geo/";

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
              if(data_resp.error){// Si hubo un error

                    // Crea una alerta informando el error
                    this.alertController.create({
                      title:"Error",
                      subTitle: data_resp.mensaje,
                      buttons: ["OK"]
                    }).present()
              }else{
                this.alertController.create({
                  title:"Exito",
                  subTitle: "Por favor revise su correo, al cual fue enviada la contraseña",
                  buttons: ["OK"]
                }).present()
                this.navCtrl.setRoot(LoginPage);




              }

            } )



  }

}
