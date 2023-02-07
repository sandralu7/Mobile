import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IntercambiosProvider } from "../../providers/intercambios/intercambios";
import { AjustesProvider } from "../../providers/ajustes/ajustes";
import { Tickets } from "../../interfaces/tickets.interface";
import { LoadingController} from 'ionic-angular';

import {AlertController} from "ionic-angular";
import { UsuariosCercanos } from "../../interfaces/usuariosCercanos.interface";
import { TicketsEncontrados } from "../../interfaces/ticketsEncontrados.interface";
import { SocialSharing } from '@ionic-native/social-sharing';
import {MSJ_RESULTADOS, MSJ_GENERALES} from "../../data/data.mensajes";

/**
 * Generated class for the ResultadoBusquedaIntercambiosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resultado-busqueda-intercambios',
  templateUrl: 'resultado-busqueda-intercambios.html',
})
export class ResultadoBusquedaIntercambiosPage {

  mensajesPagina: any;
  mensajesGenerales: any;
  laminas: string = "";
  mensaje: string;
  mensajeTitulo: string;
  celularValido:string;
  proceso:string;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _intercambios:IntercambiosProvider, private socialSharing: SocialSharing,
    public _ajustes: AjustesProvider, public alertCtl:AlertController) {
      this.mensajesGenerales = MSJ_GENERALES;
      this.mensajesPagina = MSJ_RESULTADOS;
      console.log(this.navParams);
      this.proceso = this.navParams.get("proceso");
      console.log("PROCESO");
      console.log(this.proceso);

  }

  ionViewDidLoad() {
    this.proceso = this.navParams.get("proceso");
    console.log('ionViewDidLoad ResultadoBusquedaIntercambiosPage');
  }

  ionViewWillEnter(){

  }

  verInformacion(usuario:UsuariosCercanos){

  this.organizarLaminas(usuario);
  this.obtenerCelular(usuario);
   this.socialSharing.canShareVia('whatsapp').then(() => {
        this.socialSharing.shareViaWhatsAppToReceiver(this.celularValido,this.mensaje).then(() => {
          this.laminas="";
          this.alertCtl.create({
              title: "Info",
              subTitle: (this._ajustes.ajustes.idioma=='E') ? "Contactame a: "+usuario.correoUsuario:"Contact me to: "+usuario.correoUsuario,
              buttons: ["OK"]

          }).present();
        }).catch(() => {
          this.laminas="";
          this.alertCtl.create({
              title: "Info",
              subTitle: (this._ajustes.ajustes.idioma=='E') ? "Ocurrio un error":"Error",
              buttons: ["OK"]

          }).present();
        });
    }).catch(() => {
      this.laminas="";
      this.alertCtl.create({
          title: "Info",
          subTitle: (this._ajustes.ajustes.idioma=='E') ? "Ocurrio un error":"Error",
          buttons: ["OK"]

      }).present();
    });



  }


  verInformacionCorreo(usuario:UsuariosCercanos){

  this.organizarLaminas(usuario);
  this.socialSharing.canShareViaEmail().then(() => {
      // Sharing via email is possible
      this.socialSharing.shareViaEmail(this.mensaje, this.mensajeTitulo, [usuario.correoUsuario]).then(() => {
            this.laminas="";
            this.alertCtl.create({
                title: "Info",
                subTitle: (this._ajustes.ajustes.idioma=='E') ? "Contactame a: "+usuario.correoUsuario:"Contact me to: "+usuario.correoUsuario,
                buttons: ["OK"]

            }).present();
      }).catch(() => {
        this.laminas="";
        this.alertCtl.create({
            title: "Info",
            subTitle: (this._ajustes.ajustes.idioma=='E') ? "Ocurrio un error":"Error",
            buttons: ["OK"]

        }).present();
      });

    }).catch(() => {
      this.laminas="";
      this.alertCtl.create({
          title: "Info",
          subTitle: (this._ajustes.ajustes.idioma=='E') ? "Ocurrio un error":"Error",
          buttons: ["OK"]

      }).present();
    });


  }

  organizarLaminas(usuario:UsuariosCercanos){

    for(let i=0; i<usuario.tickets.length; i++){
        if(i<usuario.tickets.length-1){

            this.laminas = this.laminas + usuario.tickets[i].numeroTicket + ", ";
        
        }
        else{
          this.laminas = this.laminas + usuario.tickets[i].numeroTicket;
        }
    }
    console.log("LAMINAS INTERCAMBIO");
    console.log(this.laminas);
    if(this._ajustes.ajustes.idioma == 'E'){
      if(this.proceso=="faltantes"){
        this.mensaje ="Hola, "+ usuario.nombreUsuario+ " Te solicito intercambiar las láminas:" + this.laminas;
      }else if (this.proceso=="repetidas"){
        this.mensaje ="Hola, "+ usuario.nombreUsuario+ " Te ofrezco las láminas:" + this.laminas;
      }
      this.mensajeTitulo = "Intercambio de láminas"
    }else{
      if(this.proceso=="faltantes"){
        this.mensaje ="Hi, "+ usuario.nombreUsuario+ " I request you to exchange the stickers:" + this.laminas;
      }else if (this.proceso=="repetidas"){
        this.mensaje ="Hi, "+ usuario.nombreUsuario+ " I offer you the following stickers:" + this.laminas;
      }
      this.mensajeTitulo = "Exchange stickers"
    }

    console.log(this.mensaje);
    console.log(this.mensajeTitulo);

  }

  llamarFuncion(usuario:UsuariosCercanos){

    if(usuario.celularUsuario!=null){
      if(usuario.celularUsuario.length==10){
        if(usuario.celularUsuario.startsWith("3")){
          return true;
        }
      }else if (usuario.celularUsuario.startsWith("+")){
        return true;
      }else {
        return false;
      }
    }
    else{
      return false;
    }
    return false;
  }

  obtenerCelular(usuario:UsuariosCercanos){

    if(usuario.celularUsuario!=null){
      if(usuario.celularUsuario.length==10){
        if(usuario.celularUsuario.startsWith("3")){
          this.celularValido = "+57"+usuario.celularUsuario;
        }
      }else if (usuario.celularUsuario.startsWith("+")){
          this.celularValido = usuario.celularUsuario;
      }else {
        this.celularValido = usuario.celularUsuario;
      }
    }
    else{
      this.celularValido = usuario.celularUsuario;
    }

  }

}
