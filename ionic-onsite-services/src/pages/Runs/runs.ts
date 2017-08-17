import { Component }          from '@angular/core';
import { NavController }      from 'ionic-angular';
import { LoginService }       from "../../app/login/login.service";
import {  AfoListObservable } from 'angularfire2-offline/database'; // , AngularFireOfflineDatabase
import { HomePage} from "../home/home";
@Component({
  selector: 'page-runs',
  templateUrl: 'runs.html'
})



export class RunsPage {

   public selected_run: Number;
   public runs:      AfoListObservable<any[]>;

   username: string;

  constructor(public navCtrl: NavController, private loginService: LoginService) {
    this.loginService.configObservable.subscribe( value => {this.selected_run = value; } );
    this.selected_run = loginService.selected_run_id;
  }

  ionViewWillEnter() {
    if ( this.loginService.username )
      {
        this.username= this.loginService.username;
      }
       this.runs      = this.loginService.get_runs();
       console.log('ionViewWillEnter  ' +  this.selected_run );
  }


  select_run()
  {
    this.loginService.select_run( this.selected_run );
    this.navCtrl.push(HomePage, {});
  }

}
