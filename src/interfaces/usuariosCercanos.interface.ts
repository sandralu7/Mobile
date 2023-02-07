

import { TicketsEncontrados } from "./ticketsEncontrados.interface";



export interface UsuariosCercanos{
  usalIdEmisor:number;
  usuaIdEmisor: number;
  usuaNombreEmisor: string;
  usuaCorreoEmisor: string;
  latitudEmisor: string;
  longitudEmisor: string;
  reluIdReceptor: number;
  usalIdReceptor: number;
  idUsuario:number;
  nombreUsuario:string;
  correoUsuario:string;
  celularUsuario:string;
  latitudReceptor: string;
  longitudReceptor: string;
  porcentajeLlenado: number;
  distanciaKm: string;
  tickets: TicketsEncontrados[];
}
