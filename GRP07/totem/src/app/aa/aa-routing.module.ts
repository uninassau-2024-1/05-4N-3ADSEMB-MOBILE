import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AAPage } from './aa.page';

const routes: Routes = [
  {
    path: '',
    component: AAPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AAPageRoutingModule {}
