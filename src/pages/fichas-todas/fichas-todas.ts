import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Seccion } from "../../interfaces/seccion.interface";
import { Tickets } from "../../interfaces/tickets.interface";
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log('Cargo parametros')
    console.log(navParams);
    this.seccion = this.navParams.data;
    this.tickets = this.seccion.tickets;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FichasTodasPage');
  }

}
