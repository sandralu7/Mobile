import { Http, URLSearchParams} from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import {AlertController} from "ionic-angular";

import { URL_SERVICIOS} from "../../config/url.servicios";
import { Album } from "../../interfaces/album.interface";

import { ALBUMS } from "../../data/data2";


/*
  Generated class for the AlbumProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlbumProvider {

  token:string = "59915aa41a1ead79412005bf8ebc157d19515871";
  idUsuario: number = 1;
  idAlbum: number = 1;

  albumes:Album[] = [];
  albumesCantidad: Album[] =[];

  constructor(public http: Http, public alertCtl:AlertController) {
    this.cargar_todos();
    //this.albumes = ALBUMS.slice(0);
    //console.log('Constructor');
    //console.log(this.albumes);
  }

  cargar_todos(){
    let url = URL_SERVICIOS + "/album/obtener_informacion_albun_usuario/"+this.idUsuario;

      this.http.get(url).subscribe(res =>{
      console.log(res);
       if(res.json()['ERROR']){
         //aqui hay un error
       }else{
         this.albumes.push(...res.json()['ALBUMS']);

       }
     });



  }

  cargar_todosPorCantidad(token: string, idUsuario: number, idAlbum:number, rangoInicial:number, rangoFinal:number){
    let url = URL_SERVICIOS + "/album/obtener_informacion_albun_usuario_cantidad/"+token+"/"+idUsuario+"/"+idAlbum+"/"+rangoInicial+"/"+rangoFinal;

      this.http.get(url).subscribe(res =>{
       console.log(res);
       if(res['ERROR']){
         //aqui hay un error
       }else{
          this.albumesCantidad.splice(0,this.albumesCantidad.length);
         this.albumesCantidad.push(...res.json()['ALBUMS']);
         console.log("Albumes from "+rangoInicial+" "+rangoFinal);
         console.log(this.albumesCantidad);
       }
     });


  }

  agregarLamina(idLamina:number){
    let data = new URLSearchParams();
    data.append("USUA_ID",this.idUsuario.toString());
    data.append("NUMERO_LAMINA",idLamina.toString());

    //let url = `${URL_SERVICIOS}/ficha/registrar_ficha/`;

    let url = "https://app-1520633753.000webhostapp.com/rest/index.php/ficha/registrar_ficha/";
    console.log(url);
    this.http.post(url,data).subscribe(resp =>{
              console.log(resp);
              let respuesta = resp.json();
              console.log("Respuesta JSON");
              console.log(respuesta);
              if(resp['ERROR']){
                this.alertCtl.create({
                    title: "Error",
                    subTitle: resp['mensaje'],
                    buttons: ["OK"]

                }).present();
              }else{
                this.alertCtl.create({
                    title: "Lamina Agregada",
                    subTitle: "La lámina se ha agregado correctamente",
                    buttons: ["OK"]

                }).present();
              }
            })
  }


  eliminarLamina(idLamina:number){
    let data = new URLSearchParams();
    data.append("USUA_ID",this.idUsuario.toString());
    data.append("NUMERO_LAMINA",idLamina.toString());

    //let url = `${URL_SERVICIOS}/ficha/registrar_ficha/`;

    let url = URL_SERVICIOS+"/ficha/eliminar_ficha/";
    console.log(url);
    this.http.post(url,data).subscribe(resp =>{
              console.log(resp);
              let respuesta = resp.json();
              console.log("Respuesta JSON");
              console.log(respuesta);
              if(resp['ERROR']){
                this.alertCtl.create({
                    title: "Error",
                    subTitle: resp['mensaje'],
                    buttons: ["OK"]

                }).present();
              }else{
                this.alertCtl.create({
                    title: "Lamina Agregada",
                    subTitle: "La lámina se eliminó correctamente",
                    buttons: ["OK"]

                }).present();
              }
            })

  }



}
