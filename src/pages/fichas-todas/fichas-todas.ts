import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  ActionSheetController  } from 'ionic-angular';
import { Seccion } from "../../interfaces/seccion.interface";
import { Tickets } from "../../interfaces/tickets.interface";

import { AlbumProvider } from "../../providers/album/album";
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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private actionSheetCtrl: ActionSheetController,
              private _albumes:AlbumProvider) {
    this.seccion = this.navParams.data;
    this.tickets = this.seccion.tickets;
    console.log("Tickets");
    console.log(this.tickets);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FichasTodasPage');
  }



  presentActionSheet(ticket:Tickets) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      buttons: [
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'Añadir',
          handler: () => {
            console.log('Archive clicked');
            //ticket.cantidad += 1;
            ticket.cantidad = parseInt(ticket.cantidad.toString())+1;
            this._albumes.agregarLamina(ticket.idTicket);
            console.log(ticket.cantidad);
          }
        },{
          text: 'Cancel',
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
