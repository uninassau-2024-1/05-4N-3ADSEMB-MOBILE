import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'aa',
    loadChildren: () => import('./aa/aa.module').then( m => m.AAPageModule)
  },
  {
    path: 'as',
    loadChildren: () => import('./as/as.module').then( m => m.ASPageModule)
  },
  {
    path: 'ac',
    loadChildren: () => import('./ac/ac.module').then( m => m.ACPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
