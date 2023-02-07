import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IntercambiosProvider } from "../../providers/intercambios/intercambios";
import { AjustesProvider } from "../../providers/ajustes/ajustes";
import { Tickets } from "../../interfaces/tickets.interface";
import { LoadingController} from 'ionic-angular';
import { ResultadoBusquedaIntercambiosPage } from "../resultado-busqueda-intercambios/resultado-busqueda-intercambios";
import {MSJ_INTERCAMBIO, MSJ_GENERALES} from "../../data/data.mensajes";

@Component({
  selector: 'page-intercambio',
  templateUrl: 'intercambio.html',
})
export class IntercambioPage {

  distancia:number;
  singleValue:number;
  ticketsSeleccionados: Tickets[] =[];
  mostrarResultado:boolean;
  proceso:string;

  mensajesPagina: any;
  mensajesGenerales: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _intercambios:IntercambiosProvider,
              public _ajustes: AjustesProvider, public loadingCtrl: LoadingController) {
                this.ticketsSeleccionados = this._ajustes.ticketsSeleccionados;
                this.mostrarResultado=false;
                this.mensajesGenerales = MSJ_GENERALES;
                this.mensajesPagina = MSJ_INTERCAMBIO;

                console.log(this.navParams);
                this.proceso = this.navParams.get("proceso");
                console.log("PROCESO");
                console.log(this.proceso);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntercambioPage');
  }

  ionViewWillEnter(){
    this.ticketsSeleccionados = this._ajustes.ticketsSeleccionados;
    this.proceso = this.navParams.get("proceso");


  }

  buscarCercanos(){

    console.log("numeros de ticket");

    console.log(this.ticketsSeleccionados);
    console.log(this._ajustes.ticketsSeleccionados);

      if(this.ticketsSeleccionados.length==1){
        if(this.proceso=="faltantes"){
          this._intercambios.cargarUsuariosCercanos(this.distancia,this.ticketsSeleccionados[0].numeroTicket, null, null);
        }
        else if (this.proceso=="repetidas"){
            this._intercambios.cargarUsuariosOfrecidos(this.distancia,this.ticketsSeleccionados[0].numeroTicket, null, null);
        }

      }else if(this.ticketsSeleccionados.length==2){
       if(this.proceso=="faltantes"){
            this._intercambios.cargarUsuariosCercanos(this.distancia,this.ticketsSeleccionados[0].numeroTicket, this.ticketsSeleccionados[1].numeroTicket, null);
        }
        else if (this.proceso=="repetidas"){
            this._intercambios.cargarUsuariosOfrecidos(this.distancia,this.ticketsSeleccionados[0].numeroTicket, this.ticketsSeleccionados[1].numeroTicket, null);
        }

      }else if(this.ticketsSeleccionados.length==3){
        if(this.proceso=="faltantes"){
            this._intercambios.cargarUsuariosCercanos(this.distancia,this.ticketsSeleccionados[0].numeroTicket, this.ticketsSeleccionados[1].numeroTicket, this.ticketsSeleccionados[2].numeroTicket);
          }
          else if (this.proceso=="repetidas"){
            this._intercambios.cargarUsuariosOfrecidos(this.distancia,this.ticketsSeleccionados[0].numeroTicket, this.ticketsSeleccionados[1].numeroTicket, this.ticketsSeleccionados[2].numeroTicket);

          }
      }

      //this._intercambios.cargarUsuariosCercanos(this.distancia,621, 622, 623);
      this.navCtrl.push(ResultadoBusquedaIntercambiosPage, {'proceso': this.proceso});

  }

}
