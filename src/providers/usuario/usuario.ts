import { Http, URLSearchParams} from '@angular/http';
import { Injectable } from '@angular/core';

import { Usuarios } from "../../interfaces/usuario.interface";

import {USUARIO} from "../../data/data.usuario";
import {AjustesProvider} from "../ajustes/ajustes";
import {URL_SERVICIOS} from "../../config/url.servicios";

import {AlertController} from "ionic-angular";
import { LoadingController} from 'ionic-angular';

/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider {

  token:string = "59915aa41a1ead79412005bf8ebc157d19515871";
  idAlbum: number = 1;
  idUsuario:any;

  usuario = {} as Usuarios;



  constructor(public http: Http, private ajustes: AjustesProvider,
    public alertCtl:AlertController,public loadingCtrl: LoadingController ) {

    this.idUsuario = this.ajustes.ajustes.id_usuario;
    console.log('Hello UsuarioProvider Provider');
    this.consultarUsuario();


  }

  consultarUsuario(){
    let data = new URLSearchParams();
    data.append("USUA_ID",this.idUsuario.toString());

    let url = URL_SERVICIOS + "/usuario/obtener_informacion_usuario/";

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
              if(resp['error']){
                this.alertCtl.create({
                    title: "Error",
                    subTitle: respuesta['mensaje'],
                    buttons: ["OK"]

                }).present();
              }else{
                this.usuario = respuesta['USUARIOS'];
                console.log("USUARIO PROVIDER");
                console.log(this.usuario);
              }
            })

  }


}
