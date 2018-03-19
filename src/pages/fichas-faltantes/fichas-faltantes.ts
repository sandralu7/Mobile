import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {IntercambioPage} from "../index.paginas";
import { Album } from "../../interfaces/album.interface";
import {AlbumProvider} from "../../providers/album/album";
import { Tickets } from "../../interfaces/tickets.interface";



@Component({
  selector: 'page-fichas-faltantes',
  templateUrl: 'fichas-faltantes.html',
})
export class FichasFaltantesPage {

  token:string = "59915aa41a1ead79412005bf8ebc157d19515871";
  idUsuario: number = 3;

  album = {} as Album;
  albumesCantidad: Album[] =[];
  ticketsSeleccionados: Tickets[] =[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _albumes:AlbumProvider) {

    this.album = this.navParams.data;
  }
  ionViewWillEnter(){
    this._albumes.cargar_todosPorCantidad(this.token, this.idUsuario,this.album.idAlbum,0,0);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FichasFaltantesPage');
  }

  navegarIntercambio(){
    this.navCtrl.push(IntercambioPage);
  }

  anadirAlista(ticket:Tickets){
    if(this.ticketsSeleccionados.length==0){
      this.ticketsSeleccionados.push(ticket);
      return;
    }
    else if(this.ticketsSeleccionados.length==3){
      return;
    }
    for(let i=0; i<this.ticketsSeleccionados.length; i++){
      if(this.ticketsSeleccionados[i].idTicket == ticket.idTicket){
        this.ticketsSeleccionados.splice(i,1);
      }
      else{
        this.ticketsSeleccionados.push(ticket);
      }
    }

    console.log(this.ticketsSeleccionados);
  }


}
