var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { HomePage } from '../pages/home/home';
//import { ListPage } from '../pages/list/list';
import { LoginService } from "./login/login.service";
import { LoginComponent } from "./login/login.component";
import { MenuComponent } from "./menu.component";
var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, loginService) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.loginService = loginService;
        this.initializeApp();
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.ngOnInit = function () {
        var componentStack = [{
                page: MenuComponent
            }];
        if (!this.loginService.isLoggedIn) {
            componentStack.push({ page: LoginComponent });
        }
        this.nav.insertPages(0, componentStack, { animate: false });
    };
    return MyApp;
}());
__decorate([
    ViewChild(Nav),
    __metadata("design:type", Nav)
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Component({
        //templateUrl: 'app.html'
        template: '<ion-nav #baseNav></ion-nav>',
        providers: [LoginService]
    }),
    __metadata("design:paramtypes", [Platform, StatusBar, SplashScreen, LoginService])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map