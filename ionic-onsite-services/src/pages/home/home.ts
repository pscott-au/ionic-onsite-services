import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginService} from "../../app/login/login.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
   username: string;
  constructor(public navCtrl: NavController, private loginService: LoginService) {

  }

  ionViewWillEnter() {
    if ( this.loginService.username )
      {
        this.username= this.loginService.username;
      }
  }

}
