import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FichasTodasPage } from './fichas-todas';

@NgModule({
  declarations: [
    FichasTodasPage,
  ],
  imports: [
    IonicPageModule.forChild(FichasTodasPage),
  ],
})
export class FichasTodasPageModule {}
