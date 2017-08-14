import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginService} from "../../app/login/login.service";
//import { HomePage } from '../home/home';
//import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
// import { AngularFireOfflineModule } from 'angularfire2-offline'; // not sure why this isn't reqd?
//import * as firebase from 'firebase/app'; // lint suggests not required?
import {  AfoListObservable } from 'angularfire2-offline/database'; // , AngularFireOfflineDatabase

@Component({
  selector: 'page-runs',
  templateUrl: 'runs.html'
})


// type MyArrayType = Array<{id: number, text: string}>;



export class RunsPage {
   //public items: FirebaseListObservable<any[]>;
   public selected_run: Number;
   public items: AfoListObservable<any[]>;
   public runs: AfoListObservable<any[]>;
//   public runs: Array = [ { bb: 'alpba'}, { bb: 'beta'}];

    public runs_tet: Array<{id: number, text: string}> =  [
        {id: 1, text: 'Sentence 1'},
        {id: 2, text: 'Sentence 2'},
        {id: 3, text: 'Sentence 3'},
        {id: 4, text: 'Sentenc4 '},
    ];

   username: string;
  

  constructor(public navCtrl: NavController, private loginService: LoginService) {
    this.loginService.configObservable.subscribe( value => {this.selected_run = value; } );
    this.selected_run = loginService.selected_run_id;
    console.log('selected run - ' + this.selected_run);

  }

  ionViewWillEnter() {
    if ( this.loginService.username )
      {
        this.username= this.loginService.username;
      }
       this.items = this.loginService.run_items();
       this.runs = this.loginService.get_runs();
       //this.items.push('Greek' );
       console.log('ionViewWillEnter  ' +  this.selected_run );
  }


  select_run()
  {
    console.log('select_run2 selected ' + this.selected_run );
    this.loginService.select_run( this.selected_run );
  }

  /*
  compareFn(e1: Number, e2: Number):Boolean {
    console.log('dfdfd');
    return e1 && e2 ? e1 === e2 : e1 === e2;
  }
  */

}
