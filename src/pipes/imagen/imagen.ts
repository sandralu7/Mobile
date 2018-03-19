import { Pipe, PipeTransform } from '@angular/core';
import { URL_IMAGENES } from "../../config/url.servicios";

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {

  transform(nombre: string, activo: string) {
    return URL_IMAGENES+activo+nombre;
  }
}
