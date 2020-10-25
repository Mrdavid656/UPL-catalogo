import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoauthPage } from './noauth.page';

const routes: Routes = [
  {
    path: '',
    component: NoauthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoauthPageRoutingModule {}
