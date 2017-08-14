import { Component }          from '@angular/core';
import { NavController }      from 'ionic-angular';
import { LoginService }       from "../../app/login/login.service";
import {  AfoListObservable } from 'angularfire2-offline/database'; // , AngularFireOfflineDatabase

@Component({
  selector: 'page-runs',
  templateUrl: 'runs.html'
})



export class RunsPage {

   public selected_run: Number;
   public run_items: AfoListObservable<any[]>;
   public runs: AfoListObservable<any[]>;

   username: string;

  constructor(public navCtrl: NavController, private loginService: LoginService) {
    this.loginService.configObservable.subscribe( value => {this.selected_run = value; } );
    this.selected_run = loginService.selected_run_id;
    //console.log('selected run - ' + this.selected_run);

  }

  ionViewWillEnter() {
    if ( this.loginService.username )
      {
        this.username= this.loginService.username;
      }
       this.run_items = this.loginService.run_items();
       this.runs      = this.loginService.get_runs();
       //this.items.push('Greek' );
       console.log('ionViewWillEnter  ' +  this.selected_run );
  }


  select_run()
  {
    this.loginService.select_run( this.selected_run );
  }

}
