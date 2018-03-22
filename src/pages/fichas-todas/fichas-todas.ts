import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  ActionSheetController  } from 'ionic-angular';
import { Seccion } from "../../interfaces/seccion.interface";
import { Tickets } from "../../interfaces/tickets.interface";

import { AlbumProvider } from "../../providers/album/album";
import {AlertController} from "ionic-angular";

import { AjustesProvider } from "../../providers/ajustes/ajustes";
import {MSJ_TODAS, MSJ_GENERALES} from "../../data/data.mensajes";
/**
 * Generated class for the FichasTodasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fichas-todas',
  templateUrl: 'fichas-todas.html',
})
export class FichasTodasPage {

  seccion = {} as Seccion;
  tickets: Tickets [] = [];

  mensajesPagina: any;
  mensajesGenerales: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private actionSheetCtrl: ActionSheetController,
              private _albumes:AlbumProvider,
              public alertCtl:AlertController, public _ajustes: AjustesProvider) {
    this.seccion = this.navParams.get("seccion");
    this.tickets = this.seccion.tickets;
    console.log("Tickets");
    console.log(this.tickets);
    this.mensajesGenerales = MSJ_GENERALES;
    this.mensajesPagina = MSJ_TODAS;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FichasTodasPage');
  }



  presentActionSheet(ticket:Tickets) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      buttons: [
        {

          text: (this._ajustes.ajustes.idioma=='E') ? this.mensajesPagina.eliminar:this.mensajesPagina.eliminarIng,

          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            if(ticket.cantidad == 0){
              this.alertCtl.create({
                  title: "Error",
                  subTitle: (this._ajustes.ajustes.idioma=='E') ? this.mensajesPagina.noLaminasEliminar:this.mensajesPagina.noLaminasEliminarIng,
                  buttons: ["OK"]

              }).present();
            }
            else{
              ticket.cantidad = parseInt(ticket.cantidad.toString())-1;
              this._albumes.eliminarLamina(ticket.numeroTicket);
            }

          }
        },{
          text: (this._ajustes.ajustes.idioma=='E') ? this.mensajesPagina.anadir:this.mensajesPagina.anadirIng,
          handler: () => {
            console.log('Archive clicked');
            ticket.cantidad = parseInt(ticket.cantidad.toString())+1;
            this._albumes.agregarLamina(ticket.numeroTicket);

          }
        },{
          text: (this._ajustes.ajustes.idioma=='E') ? this.mensajesPagina.cancelar:this.mensajesPagina.cancelarIng,
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }



}
