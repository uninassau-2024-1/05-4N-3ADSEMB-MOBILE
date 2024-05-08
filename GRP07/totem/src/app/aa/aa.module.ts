import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AAPageRoutingModule } from './aa-routing.module';

import { AAPage } from './aa.page';
import { CriarSenhaService } from '../services/criar-senha.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AAPageRoutingModule
  ],
  declarations: [AAPage]
})
export class AAPageModule {}
