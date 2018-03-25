import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Platform} from 'ionic-angular';

/*
  Generated class for the AjustesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AjustesProvider {

  // Objeto que se desea guardar
  ajustes={
    mostrar_login:true,
    id_usuario:"",
    token:"",
    idioma:"",
    mostrar_configuracion:true,
    estado_usuario:0,
    correo_usuario:"",
    clave_usuario:""
  };

  banderaAppFree=true;

  constructor(private platform : Platform,
              private storage : Storage) {
    console.log('Hello AjustesProvider Provider');
  }



// Carga lo guardado en el storage

  cargar_storage(){

    let promesa=new Promise((resolve, reject) => {
      if( this.platform.is("cordova")){
        console.log("Inicializando Storage");

        // Dispositivo
        this.storage.ready()
        .then(()=>{
          console.log("Storage Listo");

            this.storage.get("ajustes")
            .then( ajustes => {
              if(ajustes){
                this.ajustes=ajustes;
              }
              console.log("COrrep stotage: "+this.ajustes.correo_usuario);

              resolve();

            });
        })

      }else{
        // Escritorio
         if (localStorage.getItem("ajustes")){
            this.ajustes = JSON.parse(localStorage.getItem("ajustes"));

          }
          resolve();

      }

    });
    return promesa;






  }
/*
Guarda el storage del dispositivo
*/

  guardar_storage(){
  if( this.platform.is("cordova")){
    // Dispositivo
    this.storage.ready()
    .then ( ()=> {
      this.storage.set("ajustes", this.ajustes);

    })


  }else{
    // Escritorio
    localStorage.setItem("ajustes", JSON.stringify(this.ajustes));
  }
}

/*
Eliminar el storage del dispositivo
*/

  eliminar_storage(){
  if( this.platform.is("cordova")){
    // Dispositivo
    this.storage.ready()
    .then ( ()=> {
      this.storage.remove("ajustes");

    })


  }else{
    // Escritorio
    localStorage.removeItem("ajustes");
  }
}

}
