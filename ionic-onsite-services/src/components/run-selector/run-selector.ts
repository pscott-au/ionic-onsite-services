import { Component,Output, EventEmitter } from '@angular/core';
import { LoginService }       from "../../app/login/login.service";
import {  AfoListObservable } from 'angularfire2-offline/database'; // , AngularFireOfflineDatabase

/**
 * Generated class for the RunSelectorComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'run-selector',
  templateUrl: 'run-selector.html'
})



export class RunSelectorComponent {

  @Output() runUpdated = new EventEmitter();
  public selected_run: Number;
  public runs:      AfoListObservable<any[]>;

  constructor( private loginService: LoginService ) {
    console.log('Hello RunSelectorComponent Component');
    this.loginService.configObservable.subscribe( value => {this.selected_run = value; } );
    this.selected_run = this.loginService.get_selected_run_id();
       this.runs      = this.loginService.get_runs();
       console.log('ionViewWillEnter  ' +  this.selected_run );
  }

  select_run()
  {
    this.loginService.select_run( this.selected_run );
    this.runUpdated.emit(this.select_run);
  }


}

