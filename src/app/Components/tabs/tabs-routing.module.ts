import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'inicio',
        children: [
          {
            path: '',
            loadChildren: () => import('../../Pages/inicio/inicio.module').then( m => m.InicioPageModule)
          }
        ]
      },
      {
        path: 'productos',
        children: [
          {
            path: '',
            loadChildren: () => import('../../Pages/productos/productos.module').then( m => m.ProductosPageModule)
          }
        ]
      },
      {
        path: 'aboutus',
        children: [
          {
            path: '',
            loadChildren: () => import('../../Pages/aboutus/aboutus.module').then( m => m.AboutusPageModule)
          }
        ]
      },
      {
        path: 'contactos',
        children: [
          {
            path: '',
            loadChildren: () => import('../../Pages/contactos/contactos.module').then( m => m.ContactosPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
