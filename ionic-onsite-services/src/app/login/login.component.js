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
import { NavController } from "ionic-angular/index";
var LoginComponent = (function () {
    function LoginComponent(loginService, nav) {
        this.loginService = loginService;
        this.nav = nav;
        // auto login if able
        if (this.loginService.authorized) {
            this.nav.pop();
        }
        //this.items = loginService.items;
    }
    LoginComponent.prototype.login_firebase_email = function (username, password) {
        var _this = this;
        this.loginService.emailLoginFirebase(username, password).subscribe(function (res) {
            console.log('success');
            _this.nav.pop();
        }, function (error) {
            console.log('error');
        });
    };
    LoginComponent.prototype.login = function (username, password) {
        var _this = this;
        this.loginService.login(username, password).subscribe(function (res) {
            console.log('success');
            if (_this.loginService.isLoggedIn) {
                _this.nav.pop();
            }
        }, function (error) {
            console.log('error');
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    Component({
        templateUrl: 'login.html'
    }),
    __metadata("design:paramtypes", [LoginService, NavController])
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map