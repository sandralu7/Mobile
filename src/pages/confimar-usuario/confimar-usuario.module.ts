import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfimarUsuarioPage } from './confimar-usuario';

@NgModule({
  declarations: [
    ConfimarUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfimarUsuarioPage),
  ],
})
export class ConfimarUsuarioPageModule {}
