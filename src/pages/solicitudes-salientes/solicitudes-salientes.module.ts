import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SolicitudesSalientesPage } from './solicitudes-salientes';

@NgModule({
  declarations: [
    SolicitudesSalientesPage,
  ],
  imports: [
    IonicPageModule.forChild(SolicitudesSalientesPage),
  ],
})
export class SolicitudesSalientesPageModule {}
