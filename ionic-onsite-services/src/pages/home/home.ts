import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginService} from "../../app/login/login.service";
import {  AfoListObservable } from 'angularfire2-offline/database'; // , AngularFireOfflineDatabase
import {DropDetailPage} from '../drop-detail/drop-detail';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})



export class HomePage {
   public items: AfoListObservable<any[]>;
   username: string;

   constructor(public navCtrl: NavController, private loginService: LoginService) {
   }


   handle_new_run_selected( event ) {
    console.log('Page handling change to run ');
    this.items = this.loginService.selected_run();
  }



   /***** USER PER DROP ACTIONS  **/


   edit_drop_detail(item,i) {
    this.loginService.select_drop(i);
    this.navCtrl.push(DropDetailPage, {
      item: item,
    });
   }

   cancel_drop(i) {
    console.log('cancel drop'+ i);
    
    //this.items.update(  {i: {status: 0}} );
    this.items.update( i.toString(), {"status": 0} );
   }

   complete_drop(i) {
    console.log('complete drop' + i);
    this.items.update(  i.toString(), {"status": 1} );
   }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    if ( this.loginService.username )
      {
        this.username= this.loginService.username;
      }
       this.items = this.loginService.selected_run();
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
  }

   /*
  ionViewWillEnter() {
    if ( this.loginService.username )
      {
        this.username= this.loginService.username;
      }
       this.items = this.loginService.items();
       //this.items.push('Greek' );
  }
      */


}
