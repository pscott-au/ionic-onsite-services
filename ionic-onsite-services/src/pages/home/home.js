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
import { NavController } from 'ionic-angular';
import { LoginService } from "../../app/login/login.service";
var HomePage = (function () {
    function HomePage(navCtrl, loginService) {
        this.navCtrl = navCtrl;
        this.loginService = loginService;
    }
    HomePage.prototype.cancel_drop = function (i) {
        console.log('cancel drop' + i);
        //this.items.update(  {i: {status: 0}} );
        this.items.update(i.toString(), { "status": 0 });
    };
    HomePage.prototype.complete_drop = function (i) {
        console.log('complete drop' + i);
        this.items.update(i.toString(), { "status": 1 });
    };
    HomePage.prototype.ionViewDidEnter = function () {
        console.log('ionViewDidEnter');
        if (this.loginService.username) {
            this.username = this.loginService.username;
        }
        this.items = this.loginService.run_items();
        // console.log('Item count = ' + this.items.count() );
        /** DEBUG CODE - LOG EACH ITEM  */
        /*
         this.items.subscribe(items => {
            // items is an array
            items.forEach(item => {
                console.log('Item:', item);
            });
        });
          */
        //this.items.push('Greek' );
    };
    return HomePage;
}());
HomePage = __decorate([
    Component({
        selector: 'page-home',
        templateUrl: 'home.html'
    }),
    __metadata("design:paramtypes", [NavController, LoginService])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.js.map