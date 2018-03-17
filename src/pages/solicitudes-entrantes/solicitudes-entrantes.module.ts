import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SolicitudesEntrantesPage } from './solicitudes-entrantes';

@NgModule({
  declarations: [
    SolicitudesEntrantesPage,
  ],
  imports: [
    IonicPageModule.forChild(SolicitudesEntrantesPage),
  ],
})
export class SolicitudesEntrantesPageModule {}
