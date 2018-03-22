import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { LoginPage } from "../index.paginas";


//providers
import { AjustesProvider } from "../../providers/ajustes/ajustes";

/**
 * Generated class for the ConfiguracionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-configuracion',
  templateUrl: 'configuracion.html',
})
export class ConfiguracionPage {

  idioma:string="";

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController, private alertController:AlertController,private _ajustes: AjustesProvider) {
  }

  selecciomarIdioma(idiomaSel:any){

    console.log(idiomaSel);
    if(idiomaSel == "" ){
      // Crea una alerta informando el error
      this.alertController.create({
        title:"Error ",
        subTitle: "Select language / Seleccione Idioma",
        buttons: ["OK"]
      }).present()
      return;
    }
    if(idiomaSel==1){
      this.idioma = "I";
    }
    else{
      this.idioma = "E";
    }
    this.ingresar();
  }

  ingresar(){

    // Se crea un loadiog con el fin de que verifique el usuario
    let loader = this.loadingCtrl.create({
           content: "Loading",
     });
    loader.present();
    this._ajustes.ajustes.mostrar_configuracion=false;
    this._ajustes.ajustes.idioma=this.idioma;
      // Guarda en el storage la info
    this._ajustes.guardar_storage();
    // Hace root la paginainicial
  //  this.navCtrl.setRoot(MenuInicialPage);
    this.navCtrl.setRoot(LoginPage);
    loader.dismiss();// Cierra el loading por que ya hizo la peticio





  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfiguracionPage');
  }

}
