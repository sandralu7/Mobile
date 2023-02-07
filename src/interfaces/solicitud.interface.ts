

export interface Solicitud{
  resoId: number;
  tipoSolicitud: string;
  estadoSolicitud: string;
  fechaEnviada:string;
  usuaIdReceptor: number;
  nombreReceptor: string;
  celularReceptor:string;
  correoReceptor: string;
  latitudReceptor: string;
  lonigitudReceptor: string;
  porcentajeLlenado: number;
  numeroLamina: number;
  nombreLamina: string;
  nombreLaminaIngles: string;
}
