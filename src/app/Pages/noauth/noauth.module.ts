import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoauthPageRoutingModule } from './noauth-routing.module';

import { NoauthPage } from './noauth.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoauthPageRoutingModule
  ],
  declarations: [NoauthPage]
})
export class NoauthPageModule {}
