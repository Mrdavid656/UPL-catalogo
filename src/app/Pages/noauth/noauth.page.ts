import { Component, OnInit } from '@angular/core';

import { IonRouterOutlet, Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { App } = Plugins;

@Component({
  selector: 'app-noauth',
  templateUrl: './noauth.page.html',
  styleUrls: ['./noauth.page.scss'],
})
export class NoauthPage implements OnInit {

  constructor(private platform: Platform,
    private routerOutlet: IonRouterOutlet) { 
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack()) {
        App.exitApp();
      }
    });
  }

  ngOnInit() {

  }

}
