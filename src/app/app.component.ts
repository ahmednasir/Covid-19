import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {OneSignal} from '@ionic-native/onesignal/ngx';
import { ToastService } from './services/toast-service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers:[ToastService]
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private toastService: ToastService,
    private oneSignal: OneSignal,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      let systemDark = window.matchMedia("(prefers-color-scheme: dark)");
      document.body.setAttribute('data-theme', 'dark');
      
      this.splashScreen.hide();
    });
  }
  colorTest(systemInitiatedDark) {
    if (systemInitiatedDark.matches) {
      document.body.setAttribute('data-theme', 'dark');		
    } else {
      document.body.setAttribute('data-theme', 'light');
    }
  }
  
  
}
