import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./Pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./Pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'aboutus',
    loadChildren: () => import('./Pages/aboutus/aboutus.module').then( m => m.AboutusPageModule)
  },
  {
    path: 'contactos',
    loadChildren: () => import('./Pages/contactos/contactos.module').then( m => m.ContactosPageModule)
  },
  {
    path: 'productos',
    loadChildren: () => import('./Pages/productos/productos.module').then( m => m.ProductosPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./Components/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
