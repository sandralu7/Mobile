import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {AlbumPage, LoginPage} from "../index.paginas";

import { AlertController } from 'ionic-angular';

import { Http, URLSearchParams} from '@angular/http';
import { URL_SERVICIOS} from "../../config/url.servicios";


//providers
import { AjustesProvider } from "../../providers/ajustes/ajustes";
import { LoadingController} from 'ionic-angular';
import 'rxjs/add/operator/map'


import {MSJ_REGISTRO, MSJ_GENERALES, MSJ_CORREO} from "../../data/data.mensajes";

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
  envioCorreo: any;
  codigoVerificacion: any;

  mensajesPagina: any;
  mensajesGenerales: any;
  mensajesCorreo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              private _ajustes: AjustesProvider,
              public http : Http) {
                this.mensajesGenerales = MSJ_GENERALES;
                this.mensajesPagina = MSJ_REGISTRO;
                this.mensajesCorreo = MSJ_CORREO;

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
        subTitle: (this._ajustes.ajustes.idioma=='E') ? this.mensajesPagina.ingreseNombre:this.mensajesPagina.ingreseNombreIng,
        buttons: ["OK"]
      }).present()
      return;
    }

    if(this.email == "" || this.email.length == 0){
      // Crea una alerta informando el error
      this.alertCtrl.create({
        title:"Error ",
        subTitle: (this._ajustes.ajustes.idioma=='E') ? this.mensajesPagina.ingreseEmail:this.mensajesPagina.ingreseEmailIng,
        buttons: ["OK"]
      }).present()
      return;
    }

    if(this.celular == "" || this.celular.length == 0){
      // Crea una alerta informando el error
      this.alertCtrl.create({
        title:"Error ",
        subTitle: (this._ajustes.ajustes.idioma=='E') ? this.mensajesPagina.ingreseCelular:this.mensajesPagina.ingreseCelularIng,
        buttons: ["OK"]
      }).present()
      return;
    }

    if(this.password == "" || this.password.length == 0){
      // Crea una alerta informando el error
      this.alertCtrl.create({
        title:"Error ",
        subTitle: (this._ajustes.ajustes.idioma=='E') ? this.mensajesPagina.ingreseContrasenia:this.mensajesPagina.ingreseContraseniaIng,
        buttons: ["OK"]
      }).present()
      return;
    }

    if(this.passwordver == "" || this.passwordver.length == 0){
      // Crea una alerta informando el error
      this.alertCtrl.create({
        title:"Error ",
        subTitle: (this._ajustes.ajustes.idioma=='E') ? this.mensajesPagina.ingreseConfirmacion:this.mensajesPagina.ingreseConfirmacionIng,
        buttons: ["OK"]
      }).present()
      return;
    }

    if(this.password != this.passwordver ){
      // Crea una alerta informando el error
      this.alertCtrl.create({
        title:"Error ",
        subTitle: (this._ajustes.ajustes.idioma=='E') ? this.mensajesPagina.contraseniaNoCoincide:this.mensajesPagina.contraseniaNoCoincideIng,
        buttons: ["OK"]
      }).present()
      return;
    }
    this.codigoVerificacion=Math.round(Math.random() * (999 -1) + 999);
    this.registrarServicio().subscribe( ()=>{});


  }

  enviarCorreo(){
    let datac=new URLSearchParams();
    datac.append("ASUNTO",  (this._ajustes.ajustes.idioma=='E') ? this.mensajesCorreo.asunto :this.mensajesCorreo.asuntoIng);
    datac.append("SALUDO",  (this._ajustes.ajustes.idioma=='E') ? this.mensajesCorreo.titulo :this.mensajesCorreo.tituloIng);
    datac.append("NOMBRE", this.nombre);
    datac.append("MENSAJE1",  (this._ajustes.ajustes.idioma=='E') ? this.mensajesCorreo.cuerpo1 :this.mensajesCorreo.cuerpo1Ing);
    datac.append("MENSAJE2",  (this._ajustes.ajustes.idioma=='E') ? this.mensajesCorreo.cuerpo2 :this.mensajesCorreo.cuerpo2Ing);
    datac.append("DESPEDIDA",  (this._ajustes.ajustes.idioma=='E') ? this.mensajesCorreo.despedida :this.mensajesCorreo.despedidaIng);
    datac.append("USUA_CODIGOVERIFICACION", this.codigoVerificacion);
    //datac.append("CONTENIDO", "Hola como estas Julian <br/> yucas lola");
    //datac.append("ASUNTO", "prueba gmail");
    //datac.append("EMAIL_DESTINATARIO", "julianrojasing@gmail.com");
    datac.append("EMAIL_DESTINATARIO", this.email);
      let url = URL_SERVICIOS + "/mail/enviar_correo/";
      return this.http.post(url,datac)
              .map( resp=>{
                let data_resp=resp.json();
                console.log("aNTES DE EVALUAR");
                console.log(data_resp);

                if(data_resp.error){// Si hubo un error al enviar
                    this.envioCorreo=false;
                    console.log("Pailas no envio mail");
                      this.alertCtrl.create({
                        title:"Error",
                        subTitle: data_resp.mensaje,
                        buttons: ["OK"]
                      }).present()


                }else{
                  this.codigoVerificacion=data_resp.randomId;
                  console.log("Envio Mail");
                  console.log(this.codigoVerificacion);
                  this.envioCorreo=true;
                }
              } )
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
    data.append("USUA_IDIOMA", this._ajustes.ajustes.idioma);
    data.append("USUA_CODIGOVERIFICACION", this.codigoVerificacion);


//    let url="http://www.fingergroup.com.co/rest/index.php/usuario/crear_usuario_geo/";
      let url = URL_SERVICIOS + "/usuario/crear_usuario_geo/";

    // Se crea un loadiog con el fin de que verifique el usuario
    let loader = this.loadingCtrl.create({
           content: "Wait / Espere por favor",
     });
    loader.present();


    // Realiza la peticion por medio de una promesa
    return this.http.post(url,data)
            .map( resp=>{
              let data_resp=resp.json();
              //loader.dismiss();// Cierra el loading por que ya hizo la peticion
              if(data_resp.error){// Si hubo un error

                     loader.dismiss();

                    //this._ajustes.ajustes.mostrar_login=true;
                    // Crea una alerta informando el error
                    this.alertCtrl.create({
                      title:"Error",
                      subTitle: data_resp.mensaje,
                      buttons: ["OK"]
                    }).present()
              }else{
                this.enviarCorreo().subscribe( ()=>{});
                if(  this.envioCorreo==false){
                    loader.dismiss();// Cierra el loading por que ya hizo la peticion
                    return;
                }
                loader.dismiss();// Cierra el loading por que ya hizo la peticion

                this.alertCtrl.create({
                  title:"Exito",
                  subTitle: (this._ajustes.ajustes.idioma=='E') ? this.mensajesPagina.usuarioCreadoCorrectamente:this.mensajesPagina.usuarioCreadoCorrectamenteIng,
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
