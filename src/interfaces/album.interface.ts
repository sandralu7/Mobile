import { Seccion } from "./seccion.interface";

export interface Album{
  idAlbum: number;
  nombreAlbum: string;
  nombreAlbumIngles: string;
  imagenAlbum: string;
  seccion:Seccion[];
}
