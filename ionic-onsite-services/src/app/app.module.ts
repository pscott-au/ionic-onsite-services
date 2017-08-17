import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { RunsPage } from '../pages/runs/runs';
import { MapPage } from '../pages/map/map';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginModule } from "./login/login.module";
import { MenuComponent } from "./menu.component";

import { HttpModule } from '@angular/http';
import { GoogleMaps } from '@ionic-native/google-maps'
import {DropDetailPage} from '../pages/drop-detail/drop-detail';
import {RunSelectorComponent} from '../components/run-selector/run-selector';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MenuComponent,
    RunsPage,
    MapPage,
    DropDetailPage,
    RunSelectorComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    LoginModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MenuComponent,
    RunsPage,
    MapPage,
    DropDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GoogleMaps
  ]
})
export class AppModule {}
