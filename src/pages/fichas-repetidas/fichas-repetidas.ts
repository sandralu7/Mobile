import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {IntercambioPage} from "../index.paginas";
import { Album } from "../../interfaces/album.interface";
import { Tickets } from "../../interfaces/tickets.interface";

import {AlbumProvider} from "../../providers/album/album";
import { AjustesProvider } from "../../providers/ajustes/ajustes";
import {MSJ_REPETIDAS, MSJ_GENERALES} from "../../data/data.mensajes";

import {AlertController} from "ionic-angular";

@Component({
  selector: 'page-fichas-repetidas',
  templateUrl: 'fichas-repetidas.html',
})
export class FichasRepetidasPage {

  token:string = "59915aa41a1ead79412005bf8ebc157d19515871";


  album = {} as Album;
  ticketsSeleccionados: Tickets[] =[];

  mensajesPagina: any;
  mensajesGenerales: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _albumes:AlbumProvider, public _ajustes: AjustesProvider,
    public alertCtl:AlertController) {
    this.album = this.navParams.data;
    this.mensajesGenerales = MSJ_GENERALES;
    this.mensajesPagina = MSJ_REPETIDAS;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FichasRepetidasPage');
  }

  ionViewWillEnter(){
    this.ticketsSeleccionados.splice(0,this.ticketsSeleccionados.length);
    this._albumes.cargar_todosPorCantidad(this.token, this.album.idAlbum,2,999);
  }

  navegarIntercambio(){
    if(this._ajustes.banderaAppFree){
      this.alertCtl.create({
          title: "Info",
          subTitle: (this._ajustes.ajustes.idioma=='E') ? this.mensajesGenerales.mensajeAppFree:this.mensajesGenerales.mensajeAppFreeIng,
          buttons: ["OK"]

      }).present();
    }else{
      if(this.ticketsSeleccionados.length>0){
        console.log("Desde repetidas");
        console.log(this._ajustes.ticketsSeleccionados);
        this._ajustes.ticketsSeleccionados = this.ticketsSeleccionados;
        this.navCtrl.push(IntercambioPage, {'proceso': 'repetidas'});
      }
      else{
        this.alertCtl.create({
            title: "Info",
            subTitle: (this._ajustes.ajustes.idioma=='E') ? "Seleccione minímo 1 lámina.":"Select at least 1 sticker.",
            buttons: ["OK"]

        }).present();
      }
    }
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
      this.alertCtl.create({
          title: "Info",
          subTitle: (this._ajustes.ajustes.idioma=='E') ? "Seleccione máximo 3 láminas.":"Select at least 3 sticker.",
          buttons: ["OK"]

      }).present();
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
