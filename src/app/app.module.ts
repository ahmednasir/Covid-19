import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { HttpClientModule } from "@angular/common/http";

import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import {NativeGeocoder} from '@ionic-native/native-geocoder/ngx';
import {OneSignal} from '@ionic-native/onesignal/ngx';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import {DetailsPage} from './details/details.page';

@NgModule({
  declarations: [AppComponent, DetailsPage],
  entryComponents: [DetailsPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    NativeGeocoder,
    OneSignal,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
