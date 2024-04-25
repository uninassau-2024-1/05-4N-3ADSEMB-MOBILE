import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ACPage } from './ac.page';

const routes: Routes = [
  {
    path: '',
    component: ACPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ACPageRoutingModule {}
