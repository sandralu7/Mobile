import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {AlbumPage, LoginPage} from "../index.paginas";

import { AlertController } from 'ionic-angular';

import { Http, URLSearchParams} from '@angular/http';

//providers
import { AjustesProvider } from "../../providers/ajustes/ajustes";
import { LoadingController} from 'ionic-angular';
import 'rxjs/add/operator/map'

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  nombre:string="";
  email:string="";
  celular:string="";
  password:string="";
  passwordver:string="";

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              private _ajustes: AjustesProvider,
              public http : Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  navegarPaginaAlbumes(){
    this.navCtrl.push(AlbumPage);
  }

  navegarPaginaLogin(){
      this.navCtrl.setRoot(LoginPage);
  }

  registrarUsuario(){

    if(this.nombre == "" || this.nombre.length==0){
      // Crea una alerta informando el error
      this.alertCtrl.create({
        title:"Error ",
        subTitle: "Ingrese nombre",
        buttons: ["OK"]
      }).present()
      return;
    }

    if(this.email == "" || this.email.length == 0){
      // Crea una alerta informando el error
      this.alertCtrl.create({
        title:"Error ",
        subTitle: "Ingrese email",
        buttons: ["OK"]
      }).present()
      return;
    }

    if(this.celular == "" || this.celular.length == 0){
      // Crea una alerta informando el error
      this.alertCtrl.create({
        title:"Error ",
        subTitle: "Ingrese celular",
        buttons: ["OK"]
      }).present()
      return;
    }

    if(this.password == "" || this.password.length == 0){
      // Crea una alerta informando el error
      this.alertCtrl.create({
        title:"Error ",
        subTitle: "Ingrese password",
        buttons: ["OK"]
      }).present()
      return;
    }

    if(this.passwordver == "" || this.passwordver.length == 0){
      // Crea una alerta informando el error
      this.alertCtrl.create({
        title:"Error ",
        subTitle: "Ingrese confirmación password",
        buttons: ["OK"]
      }).present()
      return;
    }

    if(this.password != this.passwordver ){
      // Crea una alerta informando el error
      this.alertCtrl.create({
        title:"Error ",
        subTitle: "Las contraseñas no coinciden",
        buttons: ["OK"]
      }).present()
      return;
    }
    this.registrarServicio().subscribe( ()=>{});


  }


  registrarServicio(){
    // Genara la peticion por medio de los parametros
    let loca="POINT(4.659049 -74.105966)";
    let data=new URLSearchParams();
    data.append("USUA_NOMBRE", this.nombre);
    data.append("USUA_CORREO", this.email);
    data.append("USUA_CLAVE", this.password);
    data.append("USUA_CELULAR", this.celular);
    data.append("USUA_LOCALIZACION", loca);
    data.append("USUA_IDIOMA", "E");


    let url="http://www.fingergroup.com.co/rest/index.php/usuario/crear_usuario_geo/";

    // Se crea un loadiog con el fin de que verifique el usuario
    let loader = this.loadingCtrl.create({
           content: "Espere por favor",
     });
    loader.present();

    // Realiza la peticion por medio de una promesa
    return this.http.post(url,data)
            .map( resp=>{
              let data_resp=resp.json();
              loader.dismiss();// Cierra el loading por que ya hizo la peticion
              if(data_resp.error){// Si hubo un error

                    //this._ajustes.ajustes.mostrar_login=true;
                    // Crea una alerta informando el error
                    this.alertCtrl.create({
                      title:"Error",
                      subTitle: data_resp.mensaje,
                      buttons: ["OK"]
                    }).present()
              }else{
                this.alertCtrl.create({
                  title:"Exito",
                  subTitle: "Usuario creado correctamente, por favor ingrese a su email y confirme el codigo de verificación",
                  buttons: ["OK"]
                }).present()
                /*
                    // Guadra la informacion retornada
                    this._ajustes.ajustes.mostrar_login=false;
                    this._ajustes.ajustes.id_usuario=data_resp.id_usuario;
                    this._ajustes.ajustes.token=data_resp.token;
                    // Guarda en el storage la info
                    this._ajustes.guardar_storage();
                    */
                    // Hace root la paginainicial
                    // Establece como Root de la pagina inicial
                    this.navCtrl.setRoot(LoginPage);
              }

            } )



  }


}
