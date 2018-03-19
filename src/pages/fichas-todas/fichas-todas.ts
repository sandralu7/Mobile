import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  ActionSheetController  } from 'ionic-angular';
import { Seccion } from "../../interfaces/seccion.interface";
import { Tickets } from "../../interfaces/tickets.interface";

import { AlbumProvider } from "../../providers/album/album";
import {AlertController} from "ionic-angular";
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
              private _albumes:AlbumProvider,
              public alertCtl:AlertController) {
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
            if(ticket.cantidad == 0){
              this.alertCtl.create({
                  title: "Error",
                  subTitle: "No tiene laminas para eliminar",
                  buttons: ["OK"]

              }).present();
            }
            else{
              ticket.cantidad = parseInt(ticket.cantidad.toString())-1;
              this._albumes.eliminarLamina(ticket.numeroTicket);
            }

          }
        },{
          text: 'Añadir',
          handler: () => {
            console.log('Archive clicked');
            ticket.cantidad = parseInt(ticket.cantidad.toString())+1;
            //this._albumes.agregarLamina(ticket.numeroTicket);
            this.alertCtl.create({
                title: "Exito",
                subTitle: "Lamina agregada correctamente. ",
                buttons: ["OK"]

            }).present();
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
