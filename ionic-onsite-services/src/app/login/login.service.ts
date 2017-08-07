import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
// import { AngularFireOfflineModule } from 'angularfire2-offline';
import { AfoListObservable,  AngularFireOfflineDatabase } from 'angularfire2-offline/database';
//import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class LoginService {
  private _username: string;
  public email: string;
  // private available_runs: any[];
  public authorized: boolean = false;
  public user: Observable<firebase.User>;
  public displayName: string;
  private afAuth;
  private afDB;
  //private _items: FirebaseListObservable<any[]>;
  public _items: AfoListObservable<any[]>;

  constructor( public http: Http, afAuth: AngularFireAuth,  afDB: AngularFireOfflineDatabase ) {
            this.user = afAuth.authState; // this is v4 version shorter than below as per https://github.com/angular/angularfire2/blob/master/docs/version-4-upgrade.md
            this.afAuth = afAuth;
            this.afDB = afDB;
            this._items = afDB.list('/cuisines');
        
        
        afAuth.authState.subscribe((user: firebase.User) => {
          if (!user) {
            this.displayName = 'not logged in';
            return;
          } else {
            this.authorized = true;
            this.displayName = user.displayName;  
            //this.email = user.email;
            console.log('firebase user credentials ok');
            console.log(user);
            console.log(this.items[0]);
            //afDB.set
            //alert(user.uid);    
          }
        });
  }
  




  loginSuccess( token )
  {
    alert('success');
  }

  loginError() {
    alert('error)');
  }

  logout() {
    this._username = '';
    //this.afAuth.auth.signOut();
    this.authorized = false;
  }

  get isLoggedIn(): boolean {
    return this._username in this;
  }

  get username(): string {
    return this._username;
  }


  //items(): FirebaseListObservable<any[]> {
    items(): AfoListObservable<any[]> {
    return this._items;
  }
    // Login on Firebase given the email and password.
    
  emailLoginFirebase(email, password) {
    //this.loadingProvider.show();
    return Observable.create(observer => {
     firebase.auth().signInWithEmailAndPassword(email, password)
      .then((success) => {
       // this.loadingProvider.hide();
       //alert('good');
       this.authorized = true;
       console.log(success.toJSON);
       
       // !PS removed setting user db profile record for now .. 
       //firebase.database().ref('/userProfile').child(success.uid).set( { ts: 'time' , email: success.email } );
       
       
       //.set({ email: success.email });
       //this.displayName = this.afAuth.user.email;
       observer.next();       
      })
       .catch((error) => {
        //alert('bad');
        observer.error();
        //this.loadingProvider.hide();
        //let code = error["code"];
        //this.alertProvider.showErrorMessage(code);
       });
    });
  }
    
  /*
     --------------------------------
      this stub was taken from other code to allow for possible inclusion of facebook login ( required ionic native facebook plugin etc )
     --------------------------------
  signInWithFacebook(): firebase.Promise<any> {
    if (this.platform.is('cordova')) {
      return Facebook.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return this.afAuth.auth.signInWithCredential(facebookCredential);
      });
    } else {
      return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    }

  }
     --------------------------------
  */

  /** this was the first parse - providing a backend CGI service that can be used to authenticate - no longer used but left for reference **/
  login(username, password): Observable<boolean> {
    this._username = username;
   let params = 'USERNAME=' + username + '&PASSWORD=' + password; // + '&run_id=116';

   let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    let options = new RequestOptions({headers: headers});
    
    // let url = 'https://shotgundriver.com/cgi-bin/dropmap_login.cgi'; // 'http://192.168.0.13/cgi-bin/ios_alpha_as_json.cgi'
    let url = 'http://192.168.0.13/cgi-bin/dropmap_login.cgi';
    //this.http.get('https://shotgundriver.com/cgi-bin/ios_alpha_as_json.cgi').map(res => res.json()).subscribe(data => {
/*

    http
  .post('/api/developers/add', body)
  // See below - subscribe() is still necessary when using post().
  .subscribe(
*/

    /*
        var params = 'USERNAME=' + username + '&PASSWORD=' + password;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({headers: headers});
        */
/*
        return this.http.post('https://shotgundriver.com/cgi-bin/ios_alpha_as_json.cgi', params, {
            headers: headers})
            .map(res => res.json())
            .subscribe(
                data => this.loginSuccess('test'), // data.auth_token
                error => this.loginError()
        );
*/
     return Observable.create(observer => {
      //add your http.post code and inside the response add 
      this.http.post( url, params ,options ).map(res => res.json()).subscribe(data => {
            console.log(data);
      });
      observer.next();
      observer.complete();
      });
  }


}