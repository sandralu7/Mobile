

import { TicketsEncontrados } from "./ticketsEncontrados.interface";



export interface UsuariosCercanos{
  idUsuario:number;
  nombreUsuario:string;
  correoUsuario:string;
  fechaCreacionUsuario:string;
  celular: string;
  localizacion: string;
  porcentajeLlenado:number;
  distancia: number;
  tickets: TicketsEncontrados[];
}
