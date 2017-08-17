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
var RunsPage = (function () {
    function RunsPage(navCtrl, loginService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.loginService = loginService;
        this.loginService.configObservable.subscribe(function (value) { _this.selected_run = value; });
        this.selected_run = loginService.selected_run_id;
        //console.log('selected run - ' + this.selected_run);
    }
    RunsPage.prototype.ionViewWillEnter = function () {
        if (this.loginService.username) {
            this.username = this.loginService.username;
        }
        this.run_items = this.loginService.run_items();
        this.runs = this.loginService.get_runs();
        //this.items.push('Greek' );
        console.log('ionViewWillEnter  ' + this.selected_run);
    };
    RunsPage.prototype.select_run = function () {
        this.loginService.select_run(this.selected_run);
    };
    return RunsPage;
}());
RunsPage = __decorate([
    Component({
        selector: 'page-runs',
        templateUrl: 'runs.html'
    }),
    __metadata("design:paramtypes", [NavController, LoginService])
], RunsPage);
export { RunsPage };
//# sourceMappingURL=runs.js.map