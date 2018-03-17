import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FichasFaltantesPage } from './fichas-faltantes';

@NgModule({
  declarations: [
    FichasFaltantesPage,
  ],
  imports: [
    IonicPageModule.forChild(FichasFaltantesPage),
  ],
})
export class FichasFaltantesPageModule {}
