import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginService} from "../../app/login/login.service";

//import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
// import { AngularFireOfflineModule } from 'angularfire2-offline'; // not sure why this isn't reqd?
//import * as firebase from 'firebase/app'; // lint suggests not required?
import {  AfoListObservable } from 'angularfire2-offline/database'; // , AngularFireOfflineDatabase

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
   //public items: FirebaseListObservable<any[]>;
   public items: AfoListObservable<any[]>;

   username: string;
  constructor(public navCtrl: NavController, private loginService: LoginService) {

  }

  ionViewWillEnter() {
    if ( this.loginService.username )
      {
        this.username= this.loginService.username;
      }
       this.items = this.loginService.items();
       //this.items.push('Greek' );
  }

}
