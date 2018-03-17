import { Tickets } from "./tickets.interface";

export interface Seccion{
  idSeccion: number;
  nombreSeccion: string;
  nombreSeleccionIngles: string;
  imagenSeccion:string;
  orden: number;
  tickets: Tickets[];
}
