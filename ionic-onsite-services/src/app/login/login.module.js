var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { LoginComponent } from "./login.component";
import { IonicModule } from 'ionic-angular';
import { LogoutComponent } from "./logout.component";
//import { Http } from '@angular/http';
//import {HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';
// import * as firebase from 'firebase/app'; // lint suggests not required?
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../environments/environment'; // contains namespace with firebase credentials etc
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireOfflineModule } from 'angularfire2-offline';
import { AngularFireDatabase } from 'angularfire2/database';
var LoginModule = (function () {
    function LoginModule() {
    }
    return LoginModule;
}());
LoginModule = __decorate([
    NgModule({
        imports: [
            IonicModule, HttpModule,
            AngularFireModule.initializeApp(environment.firebaseConfig),
            AngularFireAuthModule,
            AngularFireOfflineModule
        ],
        declarations: [LoginComponent, LogoutComponent],
        entryComponents: [LoginComponent, LogoutComponent],
        providers: [AngularFireDatabase],
        exports: [LogoutComponent]
    })
], LoginModule);
export { LoginModule };
//# sourceMappingURL=login.module.js.map