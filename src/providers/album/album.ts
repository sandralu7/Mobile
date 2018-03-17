import { Http} from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { URL_SERVICIOS} from "../../config/url.servicios";
import { Album } from "../../interfaces/album.interface";

import { ALBUMS } from "../../data/data2";


/*
  Generated class for the AlbumProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlbumProvider {

  token:string = "59915aa41a1ead79412005bf8ebc157d19515871";
  idUsuario: number = 3;
  idAlbum: number = 1;

  albumes:Album[] = [];

  constructor(public http: Http) {
    //this.cargar_todos();
    this.albumes = ALBUMS.slice(0);
    console.log('Constructor');
    console.log(this.albumes);
  }

  cargar_todos(){

    let promesa = new Promise( (resolve,reject)=>{
      let url = URL_SERVICIOS + "/album/obtener_informacion_albun_usuario/"+this.token+"/"+this.idUsuario+"/"+this.idAlbum;

      this.http.get(url)
      .map(resp=>resp.json())
      .subscribe(data => {
         console.log(data);
         if(data.error){
           //Aqui hay un problema
         }else{
         let nuevaData=this.agrupar(data.albumes,2)
         this.albumes.push(...nuevaData);

       }
       resolve();
      })
    });

    return promesa;



  }

  cargar_todos2(){
    console.log('Constructor');
  }


  private agrupar(arr:any,tamano:number){
    let nuevoArreglo =[];
    for(let i=0; i<arr.length; i+=tamano){
      nuevoArreglo.push(arr.slice(i,i+tamano));
    }
    console.log(nuevoArreglo);
    return nuevoArreglo;
  }

}
