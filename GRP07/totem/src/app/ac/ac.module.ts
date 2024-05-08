import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ACPageRoutingModule } from './ac-routing.module';

import { ACPage } from './ac.page';
import { CriarSenhaService } from '../services/criar-senha.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ACPageRoutingModule,
  ],
  declarations: [ACPage]
})
export class ACPageModule {}
