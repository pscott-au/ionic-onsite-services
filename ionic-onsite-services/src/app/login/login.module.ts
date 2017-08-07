import { NgModule }        from '@angular/core';
import { LoginComponent }  from "./login.component";
import { IonicModule }     from 'ionic-angular';
import { LogoutComponent } from "./logout.component";
//import { Http } from '@angular/http';
//import {HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';
// import * as firebase from 'firebase/app'; // lint suggests not required?
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../environments/environment'; // contains namespace with firebase credentials etc
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AngularFireOfflineModule } from 'angularfire2-offline';
import { AngularFireDatabase } from 'angularfire2/database';



@NgModule({
  imports: [  
          IonicModule,HttpModule,
          AngularFireModule.initializeApp(environment.firebaseConfig),
          AngularFireAuthModule,
          AngularFireOfflineModule
        ],
  declarations: [LoginComponent, LogoutComponent],
  entryComponents: [LoginComponent, LogoutComponent],
  providers: [AngularFireDatabase],
  exports: [LogoutComponent]
})
export class LoginModule {}
