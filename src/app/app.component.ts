import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage, AlbumPage, FichasFaltantesPage, SolicitudesEntrantesPage, SolicitudesSalientesPage, ConfimarUsuarioPage,OlvidoContraseniaPage, CambiarContraseniaPage } from "../pages/index.paginas";

//Providers
import {  AjustesProvider } from "../providers/ajustes/ajustes";
import {AlertController} from "ionic-angular";

import {MSJ_GENERALES} from "../data/data.mensajes";





@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  album = AlbumPage;
  intercambios = FichasFaltantesPage;
  solicitudesEntrantes =  SolicitudesEntrantesPage;
  solicitudesSalientes = SolicitudesSalientesPage;
  cambiarContraseniaPage = CambiarContraseniaPage;
  mensajesGenerales: any;

  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private menuCtrl: MenuController, private _ajustes:AjustesProvider,
              public alertCtl:AlertController) {
    this.mensajesGenerales = MSJ_GENERALES;
    platform.ready().then(() => {
    //  this._ajustes.cargar_storage()
  //    .then( ()=>{

          //  if(this._ajustes.ajustes.mostrar_login){
              this.rootPage = LoginPage;
          /*  }else{
              if(this._ajustes.ajustes.estado_usuario==0){
                 this.rootPage = ConfimarUsuarioPage;
              }else{
                this.rootPage = AlbumPage ;
              }
            }*/



        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();
    //  })
    });
  }

  openPage(nombrePagina:string, pagina:any){

    if(nombrePagina=='intercambios' || nombrePagina=='solicitudesEntrantes' ||  nombrePagina=='solicitudesSalientes'){


        if(this._ajustes.banderaAppFree){
          this.alertCtl.create({
              title: "Info",
              subTitle: (this._ajustes.ajustes.idioma=='E') ? this.mensajesGenerales.mensajeAppFree:this.mensajesGenerales.mensajeAppFreeIng,
              buttons: ["OK"]

          }).present();
        }else{
          this.rootPage = pagina;
          this.menuCtrl.close();
        }
    }
    else{

      this.rootPage = pagina;
      this.menuCtrl.close();
    }
  }

  cerrarSesion(){
    console.log('Entre a cerrar sesion');
    this._ajustes.ajustes.mostrar_login=false;
    this._ajustes.ajustes.id_usuario=null;
    this._ajustes.ajustes.token=null;
    this._ajustes.ajustes.estado_usuario=null
    this._ajustes.ajustes.idioma=null;
    this._ajustes.ajustes.mostrar_configuracion=true;
    // Guarda en el storage la info
    //this._ajustes.guardar_storage();
    //this._ajustes.eliminar_storage();
    // Establece como Root de la pagina inicial

  //  this.navCtrl.setRoot(LoginPage);

    console.log('sali cerrar sesion 1');
    this.rootPage = this.album;
    this.rootPage = LoginPage;
    console.log('sali cerrar sesion');
    this.menuCtrl.close();

  }
  closeMenu(){

  }
}
