import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Usuarios } from "../../interfaces/usuario.interface";

import {USUARIO} from "../../data/data.usuario";
import {AjustesProvider} from "../ajustes/ajustes";

/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider {

  token:string = "59915aa41a1ead79412005bf8ebc157d19515871";
  idUsuario: number = 1;
  idAlbum: number = 1;

  usuario = {} as Usuarios;


  constructor(public http: HttpClient, ajustes: AjustesProvider) {
    console.log('Hello UsuarioProvider Provider');
    this.usuario = USUARIO;
    console.log("Usuarios: ");
    console.log(this.usuario);

  }



}
