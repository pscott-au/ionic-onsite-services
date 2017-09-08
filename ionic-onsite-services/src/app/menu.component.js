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
import { HomePage } from '../pages/home/home';
//import { ListPage } from '../pages/list/list';
import { RunsPage } from '../pages/runs/runs';
import { MapPage } from '../pages/map/map';

var MenuComponent = (function () {
    function MenuComponent(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = MapPage;
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: HomePage },
            //{ title: 'List', component: ListPage },
            { title: 'Runs', component: RunsPage },
            { title: 'Map', component: MapPage }
        ];
    }
    MenuComponent.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    return MenuComponent;
}());
__decorate([
    ViewChild(Nav),
    __metadata("design:type", Nav)
], MenuComponent.prototype, "nav", void 0);
MenuComponent = __decorate([
    Component({
        templateUrl: 'menu.html'
    }),
    __metadata("design:paramtypes", [Platform, StatusBar, SplashScreen])
], MenuComponent);
export { MenuComponent };
//# sourceMappingURL=menu.component.js.map