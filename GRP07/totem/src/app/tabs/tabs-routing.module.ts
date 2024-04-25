import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../as/as.module').then(m => m.ASPageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../aa/aa.module').then(m => m.AAPageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../ac/ac.module').then(m => m.ACPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
