import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuariosCercanos } from "../../interfaces/usuariosCercanos.interface";

import {USUARIOS} from "../../data/data.UsuariosCercanos";
/*
  Generated class for the IntercambiosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class IntercambiosProvider {
  token:string = "59915aa41a1ead79412005bf8ebc157d19515871";
  idUsuario: number = 1;
  idAlbum: number = 1;

  usuarios:UsuariosCercanos[]=[];
  constructor(public http: HttpClient) {
    console.log('Hello IntercambiosProvider Provider');
    this.usuarios = USUARIOS.slice(0);
    console.log("Usuarios: ");
    console.log(this.usuarios);
  }
  cargarUsuariosCercanos(){

  }

}
