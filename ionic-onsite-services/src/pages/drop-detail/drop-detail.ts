import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {LoginService} from "../../app/login/login.service";



@Component({
  selector: 'page-drop-detail',
  templateUrl: 'drop-detail.html',
})
export class DropDetailPage {
  private username;
  private item;
  constructor(public navCtrl: NavController, public navParams: NavParams, private loginService: LoginService) {
    this.item = navParams.get('item');
    //this.item.fin_time = '2018-10-10 00:00:00';
    //this.item.update( i.toString(), {"status": 0} );
   // this.item.update( 'status', 1 );
    console.log(this.item);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DropDetailPage');
  }


  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    if ( this.loginService.username )
      {
        this.username= this.loginService.username;
      }
       //this.items = this.loginService.run_items();
  }

}
