var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { LoginService } from "./login.service";
import { LoginComponent } from "./login.component";
import { NavController } from "ionic-angular/index";
var LogoutComponent = (function () {
    function LogoutComponent(loginService, navController) {
        this.loginService = loginService;
        this.navController = navController;
    }
    LogoutComponent.prototype.logout = function () {
        this.loginService.logout();
        this.navController.push(LoginComponent);
    };
    return LogoutComponent;
}());
LogoutComponent = __decorate([
    Component({
        selector: 'lsd-logout',
        template: '<button ion-button color="light" (click)="logout()"><ion-icon name="exit"></ion-icon>&nbsp;Logout</button>'
    }),
    __metadata("design:paramtypes", [LoginService, NavController])
], LogoutComponent);
export { LogoutComponent };
//# sourceMappingURL=logout.component.js.map