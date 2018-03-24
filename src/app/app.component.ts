import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage, AlbumPage, FichasFaltantesPage, SolicitudesEntrantesPage, SolicitudesSalientesPage, ConfiguracionPage,ConfimarUsuarioPage,OlvidoContraseniaPage } from "../pages/index.paginas";

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
  mensajesGenerales: any;

  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private menuCtrl: MenuController, private _ajustes:AjustesProvider,
              public alertCtl:AlertController) {
    this.mensajesGenerales = MSJ_GENERALES;
    platform.ready().then(() => {
      this._ajustes.cargar_storage()
      .then( ()=>{
        if(this._ajustes.ajustes.mostrar_configuracion){
          this.rootPage = ConfiguracionPage;
        }else{
            if(this._ajustes.ajustes.mostrar_login){
              this.rootPage = LoginPage;
            }else{
              if(this._ajustes.ajustes.estado_usuario==0){
                 this.rootPage = ConfiguracionPage;
              }else{
                this.rootPage = AlbumPage ;
              }
            }
        }


        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();
      })
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
    this._ajustes.eliminar_storage();
    // Establece como Root de la pagina inicial
    this.rootPage = ConfiguracionPage;
    this.menuCtrl.close();
    console.log('sali cerrar sesion');

  }
  closeMenu(){

  }
}
