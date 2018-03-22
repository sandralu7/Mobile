import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage, AlbumPage, FichasFaltantesPage, SolicitudesEntrantesPage, SolicitudesSalientesPage, ConfiguracionPage,ConfimarUsuarioPage,OlvidoContraseniaPage } from "../pages/index.paginas";

//Providers
import {  AjustesProvider } from "../providers/ajustes/ajustes";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  album = AlbumPage;
  intercambios = FichasFaltantesPage;
  solicitudesEntrantes =  SolicitudesEntrantesPage;
  solicitudesSalientes = SolicitudesSalientesPage;

  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private menuCtrl: MenuController, private _ajustes:AjustesProvider) {
    platform.ready().then(() => {
      this._ajustes.cargar_storage()
      .then( ()=>{
        if(this._ajustes.ajustes.mostrar_configuracion){
          this.rootPage = ConfiguracionPage;
        }else{
          if(this._ajustes.ajustes.mostrar_login){
            this.rootPage = LoginPage;
          }else{
            this.rootPage = AlbumPage ;
          }
        }


        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();
      })
    });
  }

  openPage(pagina:any){


    this.rootPage = pagina;
    this.menuCtrl.close();
  }

  cerrarSesion(){
    this._ajustes.ajustes.mostrar_login=false;
    this._ajustes.eliminar_storage();
    // Establece como Root de la pagina inicial
    this.rootPage = ConfiguracionPage;
    this.menuCtrl.close();

  }
  closeMenu(){

  }
}
