import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';

//Pipe
import {ImagenPipe} from "../pipes/imagen/imagen";

import { MyApp } from './app.component';
import { AlbumPage,
  CuentaPage,
  FichasFaltantesPage,
  FichasRepetidasPage,
  FichasTodasPage,
  IntercambioPage,
  LoginPage,
  RegistroPage,
  SolicitudesEntrantesPage,
  SolicitudesSalientesPage,
  TabsPage,
  HomePage} from "../pages/index.paginas";
//servicios
import { AlbumProvider } from '../providers/album/album';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { IntercambiosProvider } from '../providers/intercambios/intercambios';

@NgModule({
  declarations: [
    MyApp,
    AlbumPage,
    CuentaPage,
    FichasFaltantesPage,
    FichasRepetidasPage,
    FichasTodasPage,
    IntercambioPage,
    LoginPage,
    RegistroPage,
    SolicitudesEntrantesPage,
    SolicitudesSalientesPage,
    TabsPage,
    HomePage,
    ImagenPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AlbumPage,
    CuentaPage,
    FichasFaltantesPage,
    FichasRepetidasPage,
    FichasTodasPage,
    IntercambioPage,
    LoginPage,
    RegistroPage,
    SolicitudesEntrantesPage,
    SolicitudesSalientesPage,
    TabsPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpModule,
    HttpClient,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AlbumProvider,
    UsuarioProvider,
    IntercambiosProvider
  ]
})
export class AppModule {}
