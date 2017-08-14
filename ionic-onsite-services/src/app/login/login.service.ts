import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import { AfoListObservable,  AngularFireOfflineDatabase } from 'angularfire2-offline/database';
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
  public _runs:  AfoListObservable<any[]>;
  public _selected_run:  AfoListObservable<any[]>;
  // public _items: AfoListObservable<any[]>;
  private _uid: String;
  public selected_run_id: Number = 0;

  public configObservable = new Subject<number>();
         emitConfig(val) {
           console.log('login service set to' + val );
         this.configObservable.next(val);
       }

  constructor( public http: Http, afAuth: AngularFireAuth,  afDB: AngularFireOfflineDatabase ) {
            this.user   = afAuth.authState; // this is v4 version shorter than below as per https://github.com/angular/angularfire2/blob/master/docs/version-4-upgrade.md
            this.afAuth = afAuth;
            this.afDB   = afDB;
            //this._items = afDB.list('/cuisines');
            this._selected_run = null;
        
        afAuth.authState.subscribe((user: firebase.User) => {
          if (!user) {
            this.displayName = 'not logged in';
            return;
          } else {
            this.authorized = true;
            this.displayName = user.displayName;  
            //this.email = user.email;
            //console.log('firebase user credentials ok');
            //console.log(user);
            //console.log(this.items[0]);
            //afDB.set
            //alert(user.uid);    
          }
        });
  }
  


  select_run( run_id: Number )
  {
    this.selected_run_id = run_id;
    console.log('login.serve run_id selected ' + run_id + ' with uid = ' + this._uid );
    this._selected_run = this.afDB.list('/user_runs/' + this._uid + '/' + run_id + '/drops' );
    // TODO this.navCtrl.setRoot(HomePage);
  }
 
  run_items(): AfoListObservable<any[]> {
    return this._selected_run;
  }

  get_runs():AfoListObservable<any[]>  { // expose a list of available runs
    this._runs = this.afDB.list('/available_runs/' + this._uid);
    return this._runs;   
  }

  logout() {
    this._username = '';
    //this.afAuth.auth.signOut();
    this.afDB.reset(); // flushes local storage .. consider add warning first
    this.authorized = false;
  }

  get isLoggedIn(): boolean {
    return this._username in this;
  }

  get username(): string {
    return this._username;
  }


  loginSuccess( token ) // not used
  {
    alert('success');
  }

  loginError() { // not used
    alert('error)');
  }


  //items(): FirebaseListObservable<any[]> {

    // Login on Firebase given the email and password.
    
  emailLoginFirebase(email, password) {
    //this.loadingProvider.show();
    return Observable.create(observer => {
     firebase.auth().signInWithEmailAndPassword(email, password)
      .then((success) => {
       // this.loadingProvider.hide();
       //alert('good');
       this.authorized = true;
       //console.log(success.toJSON);
       this._uid = success.uid;
       this._username = success.email;
       console.log("Successful login from email with uid = " + success.uid );
       // !PS     this._runs = this.afDB.list('available_runs').child(success.uid);
       //this._runs = this.afDB.list(/'available_runs'); // .child(success.uid).AfoListObservable;
//
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