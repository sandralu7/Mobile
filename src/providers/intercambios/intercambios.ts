import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { URL_SERVICIOS} from "../../config/url.servicios";
import { Http, URLSearchParams} from '@angular/http';
import {AjustesProvider} from "../ajustes/ajustes";
import { LoadingController} from 'ionic-angular';

import { UsuariosCercanos } from "../../interfaces/usuariosCercanos.interface";
import {AlertController} from "ionic-angular";
import { ToastController } from 'ionic-angular';
import { SeccionSolicitud } from "../../interfaces/seccionSolicitud.interface";

/*
  Generated class for the IntercambiosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class IntercambiosProvider {

  idUsuario:any;
    usuariosCercanos: UsuariosCercanos[] =[];
    solicitudesSalientes: SeccionSolicitud[] =[];

  constructor(public http: Http,   private ajustes:AjustesProvider,
    public loadingCtrl: LoadingController, public alertCtl:AlertController,
    public toastCtrl: ToastController) {
    console.log('Hello IntercambiosProvider Provider');
      this.idUsuario = this.ajustes.ajustes.id_usuario;
  }

  cargarUsuariosCercanos(distancia: number, laminaNumero1:number, laminaNumero2:number, laminaNumero3:number){
    let data = new URLSearchParams();
    data.append("USUA_ID",this.idUsuario.toString());
    data.append("NUMERO_LAMINA1",laminaNumero1.toString());
    if(laminaNumero2!=null){
    data.append("NUMERO_LAMINA2",laminaNumero2.toString());
    }
    if(laminaNumero3!=null){
      data.append("NUMERO_LAMINA3",laminaNumero3.toString());
    }
    data.append("P_DISTANCIA",distancia.toString());

    let url = URL_SERVICIOS + "/album/obtener_informacion_usuarios_fichas/";

    let loader = this.loadingCtrl.create({
           content: (this.ajustes.ajustes.idioma=='E') ? 'Espere por favor':'Loading',
     });
    loader.present();


    return new Promise( (resolve, reject) => {
        this.http.post(url,data)
        .subscribe(
          resp =>{
                    console.log(resp);
                    let respuesta = resp.json();
                    loader.dismiss();
                    console.log("usuarios encontrados");
                    console.log(respuesta);
                    this.usuariosCercanos.splice(0,this.usuariosCercanos.length);
                    this.usuariosCercanos.push(...respuesta['USUARIOS'])
                    console.log("usuarios encontrados servicio count");
                    console.log(this.usuariosCercanos.length);

                    resolve(resp)
            },
            error => {

              reject(error);
            }
        );
    }).catch(error => {
      loader.dismiss();
      this.usuariosCercanos.splice(0,this.usuariosCercanos.length);
      //this.navCtrl.pop();
      this.alertCtl.create({
          title: "Error",
          subTitle: (this.ajustes.ajustes.idioma=='E') ? 'No se encontraron usuarios':'No users were found',
          buttons: ["OK"]


      }).present();

    });

  }

  agregarSolicitud(usualIdEmisor:number, usualIdReceptor: number,
    estadoSolicitud: string, tipoSolicitud:string, numeroSeccion:number,
    idLamina: number ){
    let data = new URLSearchParams();
    data.append("P_USAL_ID_EMISOR",usualIdEmisor.toString());
    data.append("P_USAL_ID_RECEPTOR",usualIdReceptor.toString());
    data.append("P_RESO_ESTADOSOLICITUD",estadoSolicitud.toString());
    data.append("P_RESO_TIPOSOLICITUD",tipoSolicitud.toString());
    data.append("P_RESO_NUMEROSECCION",numeroSeccion.toString());
    data.append("P_RESO_NUMEROLAMINA",idLamina.toString());

    //let url = `${URL_SERVICIOS}/ficha/registrar_ficha/`;

    let url = URL_SERVICIOS +"/solicitudes/agregar_solictud/";

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
                let toast = this.toastCtrl.create({
                message: (this.ajustes.ajustes.idioma=='E') ? 'La solicitud se ha agregado correctamente':'Request   added correctly',
                duration: 3000,
                position: 'top'
                  });
                  toast.present();
              }
            })
  }

  actualizarSolicitud(resoId:number, usuaIdEmisor: number,
    estadoSolicitud: string){
    let data = new URLSearchParams();
    data.append("P_ID_SOLICITUD",resoId.toString());
    data.append("P_USUA_ID_EMISOR",this.idUsuario.toString());
    data.append("P_ESTADO_SOLICITUD",estadoSolicitud.toString());


    //let url = `${URL_SERVICIOS}/ficha/registrar_ficha/`;

    let url = URL_SERVICIOS +"/solicitudes/actualizar_solicitud/";

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

  cargarSolicitudesSalientes(){
    let data = new URLSearchParams();
    data.append("P_USUA_ID_EMISOR",this.idUsuario.toString());


    let url = URL_SERVICIOS + "/solicitudes/consulta_solicitud_saliente/";

    let loader = this.loadingCtrl.create({
           content: (this.ajustes.ajustes.idioma=='E') ? 'Espere por favor':'Loading',
     });
    loader.present();


    return new Promise( (resolve, reject) => {
        this.http.post(url,data)
        .subscribe(
          resp =>{
                    console.log(resp);
                    let respuesta = resp.json();
                    loader.dismiss();
                    console.log("Respuesta JSON");
                    console.log(respuesta);
                    this.solicitudesSalientes.push(...respuesta['USUARIOS'])
                    resolve(resp)
            },
            error => {

              reject(error);
            }
        );
    }).catch(error => {
      loader.dismiss();
      this.solicitudesSalientes.splice(0,this.usuariosCercanos.length);
      //this.navCtrl.pop();
      this.alertCtl.create({
          title: "Error",
          subTitle: (this.ajustes.ajustes.idioma=='E') ? 'No se encontraron solicitudes':'No requests were found',
          buttons: ["OK"]


      }).present();

    });

  }

  cargarUsuariosOfrecidos(distancia: number, laminaNumero1:number, laminaNumero2:number, laminaNumero3:number){
    let data = new URLSearchParams();
    data.append("USUA_ID",this.idUsuario.toString());
    data.append("NUMERO_LAMINA1",laminaNumero1.toString());
    if(laminaNumero2!=null){
    data.append("NUMERO_LAMINA2",laminaNumero2.toString());
    }
    if(laminaNumero3!=null){
      data.append("NUMERO_LAMINA3",laminaNumero3.toString());
    }
    data.append("P_DISTANCIA",distancia.toString());

    let url = URL_SERVICIOS + "/album/ofrecer_informacion_usuarios_fichas/";

    let loader = this.loadingCtrl.create({
           content: (this.ajustes.ajustes.idioma=='E') ? 'Espere por favor':'Loading',
     });
    loader.present();


    return new Promise( (resolve, reject) => {
        this.http.post(url,data)
        .subscribe(
          resp =>{
                    console.log(resp);
                    let respuesta = resp.json();
                    loader.dismiss();
                    console.log("usuarios encontrados");
                    console.log(respuesta);
                    this.usuariosCercanos.splice(0,this.usuariosCercanos.length);
                    this.usuariosCercanos.push(...respuesta['USUARIOS'])
                    console.log("usuarios encontrados servicio count");
                    console.log(this.usuariosCercanos.length);

                    resolve(resp)
            },
            error => {

              reject(error);
            }
        );
    }).catch(error => {
      loader.dismiss();
      this.usuariosCercanos.splice(0,this.usuariosCercanos.length);
      //this.navCtrl.pop();
      this.alertCtl.create({
          title: "Error",
          subTitle: (this.ajustes.ajustes.idioma=='E') ? 'No se encontraron usuarios':'No users were found',
          buttons: ["OK"]


      }).present();

    });

  }



}
