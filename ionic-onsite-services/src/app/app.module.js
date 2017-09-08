var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RunsPage } from '../pages/runs/runs';
import { MapPage } from '../pages/map/map';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginModule } from "./login/login.module";
import { MenuComponent } from "./menu.component";
import { HttpModule } from '@angular/http';
import { GoogleMaps } from '@ionic-native/google-maps';
import {DropDetailPage} from '../drop-detail/drop-detail';

var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            MyApp,
            HomePage,
            MenuComponent,
            MapPage
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
            MenuComponent,
            MapPage,
            DropDetailPage
        ],
        providers: [
            StatusBar,
            SplashScreen,
            { provide: ErrorHandler, useClass: IonicErrorHandler },
            GoogleMaps
        ]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map