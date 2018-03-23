import { Http, URLSearchParams} from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import {AlertController} from "ionic-angular";

import { URL_SERVICIOS} from "../../config/url.servicios";
import { Album } from "../../interfaces/album.interface";

import { ALBUMS } from "../../data/data2";
import {AjustesProvider} from "../ajustes/ajustes";
import { LoadingController} from 'ionic-angular';

/*
  Generated class for the AlbumProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlbumProvider {

  token:string = "59915aa41a1ead79412005bf8ebc157d19515871";

  idAlbum: number = 1;
  idUsuario:any;
  albumes:Album[] = [];
  albumesCantidad: Album[] =[];

  constructor(public http: Http, public alertCtl:AlertController,
        private ajustes:AjustesProvider, public loadingCtrl: LoadingController,) {
    this.idUsuario = this.ajustes.ajustes.id_usuario;
    this.cargar_todos();
    //this.albumes = ALBUMS.slice(0);
    //console.log('Constructor');
    //console.log(this.albumes);
  }

  cargar_todos(){
    let url = URL_SERVICIOS + "/album/obtener_informacion_albun_usuario/"+this.idUsuario;

    let loader = this.loadingCtrl.create({
           content: (this.ajustes.ajustes.idioma=='E') ? 'Espere por favor':'Loading',
     });
    loader.present();

      this.http.get(url).subscribe(res =>{
      console.log(res);
      loader.dismiss();
       if(res.json()['ERROR']){
         //aqui hay un error
       }else{
         this.albumes.push(...res.json()['ALBUMS']);

       }
     });



  }

  cargar_todosPorCantidad(token: string, idAlbum:number, rangoInicial:number, rangoFinal:number){
    let url = URL_SERVICIOS + "/album/obtener_informacion_albun_usuario_cantidad/"+this.idUsuario+"/"+rangoInicial+"/"+rangoFinal;

    let loader = this.loadingCtrl.create({
           content: (this.ajustes.ajustes.idioma=='E') ? 'Espere por favor':'Loading',
     });
    loader.present();

      this.http.get(url).subscribe(res =>{
       console.log(res);
       loader.dismiss();
       if(res.json()['error']){
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

    let url = URL_SERVICIOS +"/ficha/registrar_ficha/";

    let loader = this.loadingCtrl.create({
           content: (this.ajustes.ajustes.idioma=='E') ? 'Espere por favor':'Loading',
     });
    loader.present();

    console.log(url);
    this.http.post(url,data).subscribe(resp =>{
              console.log(resp);
              let respuesta = resp.json();
              loader.dismiss();
              console.log("Respuesta JSON");
              console.log(respuesta);
              if(resp['ERROR']){
                this.alertCtl.create({
                    title: "Error",
                    subTitle: (this.ajustes.ajustes.idioma=='E') ? 'Ocurrio un error':'Error',
                    buttons: ["OK"]

                }).present();
              }else{
                this.alertCtl.create({
                    title: (this.ajustes.ajustes.idioma=='E') ? 'Lámina Agregada':'Sticker added',
                    subTitle: (this.ajustes.ajustes.idioma=='E') ? 'La lámina se ha agregado correctamente':'Sticker added correctly',
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
    let loader = this.loadingCtrl.create({
           content: (this.ajustes.ajustes.idioma=='E') ? 'Espere por favor':'Loading',
     });
    loader.present();
    console.log(url);
    this.http.post(url,data).subscribe(resp =>{
              console.log(resp);
              let respuesta = resp.json();
              loader.dismiss();
              console.log("Respuesta JSON");
              console.log(respuesta);
              if(resp['ERROR']){
                this.alertCtl.create({
                    title: "Error",
                    subTitle: (this.ajustes.ajustes.idioma=='E') ? 'Ocurrio un error':'Error',
                    buttons: ["OK"]

                }).present();
              }else{
                this.alertCtl.create({
                    title: (this.ajustes.ajustes.idioma=='E') ? 'Lámina Eliminada':'Sticker removed',
                    subTitle: (this.ajustes.ajustes.idioma=='E') ? 'La lámina se eliminó correctamente':'The sticker was removed correctly',
                    buttons: ["OK"]

                }).present();
              }
            })

  }



}
