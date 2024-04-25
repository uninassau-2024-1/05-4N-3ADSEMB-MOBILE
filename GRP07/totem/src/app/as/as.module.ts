import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ASPageRoutingModule } from './as-routing.module';

import { ASPage } from './as.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ASPageRoutingModule
  ],
  declarations: [ASPage]
})
export class ASPageModule {}
