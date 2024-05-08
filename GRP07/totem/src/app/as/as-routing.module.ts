import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ASPage } from './as.page';

const routes: Routes = [
  {
    path: '',
    component: ASPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ASPageRoutingModule {}
