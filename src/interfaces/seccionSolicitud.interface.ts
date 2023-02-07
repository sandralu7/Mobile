import { Solicitud } from "./solicitud.interface";

export interface SeccionSolicitud{
  numeroSeccion: number;
  nombreSeccion: string;
  nombreSeleccionIngles: string;
  rutaImagenSeccion:string;
  solicitudes: Solicitud[];
}
