import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {IntercambioPage} from "../index.paginas";
import { Album } from "../../interfaces/album.interface";
import { Tickets } from "../../interfaces/tickets.interface";

import {AlbumProvider} from "../../providers/album/album";


@Component({
  selector: 'page-fichas-repetidas',
  templateUrl: 'fichas-repetidas.html',
})
export class FichasRepetidasPage {

  token:string = "59915aa41a1ead79412005bf8ebc157d19515871";


  album = {} as Album;
  ticketsSeleccionados: Tickets[] =[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _albumes:AlbumProvider) {
    this.album = this.navParams.data;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FichasRepetidasPage');
  }

  ionViewWillEnter(){
    this._albumes.cargar_todosPorCantidad(this.token, this.album.idAlbum,2,999);
  }

  navegarIntercambio(){
    this.navCtrl.push(IntercambioPage);
  }

  anadirAlista(ticket:Tickets){

    //Si no hay elementos en el arreglo lo pongo
    if(this.ticketsSeleccionados.length==0){
      this.ticketsSeleccionados.push(ticket);
      return;
    }

    // Si hay elementos verifico que no haya sido seleccionado si no lo borro
    for(let i=0; i<this.ticketsSeleccionados.length; i++){
      if(this.ticketsSeleccionados[i].idTicket == ticket.idTicket){
        this.ticketsSeleccionados.splice(i,1);
        console.log("Lo Borre, nuevo tamanio: " +this.ticketsSeleccionados.length);
        return;
      }
    }

    //Verifico que no haya mas de 3 laminas seleccionadas
    if(this.ticketsSeleccionados.length>=3){
      console.log("Ya no puedo recibir mas");
      return;
    }
    else{
    //Si el arreglo tiene objetos y quiero agregar otro
    this.ticketsSeleccionados.push(ticket);
    console.log("tamano");
    console.log(this.ticketsSeleccionados.length);
    console.log(this.ticketsSeleccionados);
    }
  }

}
