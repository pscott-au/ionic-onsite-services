import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import { AfoListObservable,  AngularFireOfflineDatabase } from 'angularfire2-offline/database';
import * as firebase from 'firebase/app';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';

/*
  25/8/17 - refactoring to include a static internal data structure for the selected run drops in property _drops_data
*/

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
  public _runs:          AfoListObservable<any[]>;
  public _selected_run:  AfoListObservable<any[]>;


  // public _items: AfoListObservable<any[]>;
  private _uid: String;
  private _selected_drop_index: Number;
  private _selected_drop: AfoListObservable<any[]>;
  private _sig: String;
  private selected_run_id: Number = 0;
  private _drops_data: Array<any>; 


  public lat: Number;
  public lng: Number;
  private _platform: Platform;

  public configObservable = new Subject<number>();
         emitConfig(val) {
           console.log('login service set to' + val );
         this.configObservable.next(val);
       } // is this used

  constructor( public http: Http, afAuth: AngularFireAuth,  afDB: AngularFireOfflineDatabase, 
               public geolocation: Geolocation,public platform: Platform ) {
            this.user   = afAuth.authState; // this is v4 version shorter than below as per https://github.com/angular/angularfire2/blob/master/docs/version-4-upgrade.md
            this.afAuth = afAuth;
            this.afDB   = afDB;
            //this._items = afDB.list('/cuisines');

            this._selected_run = null;
            this._platform = platform;
            if (platform.is('cordova')) {
              this.geolocation.getCurrentPosition().then((position) => {
                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;
                console.log(this.lat + ',' + this.lng );
                console.log( new Date().toISOString() );
              });
            }

        afAuth.authState.subscribe((user: firebase.User) => {
          if (!user) {
            this.displayName = 'not logged in';
            this.authorized = false;
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

    
    this._selected_run.subscribe( drops=> {
      let count = 0;
      let count_green = 0;
      this._drops_data = [];
      drops.forEach( drop => { 
        count++;
        this._drops_data.push( {
          'info': drop.info,
          'status': drop.status,
          'drop_details': drop.drop_details,
          'customer_details': drop.customer_details,
          'run_order_items': drop.run_order_items
        } );
      } ) ;
      console.log( this._drops_data );

     }  ); // END subscribe to changes in run drops 
    // --------------------------------------------------------------------------------------
  }
 
  selected_run(): AfoListObservable<any[]> {
    return this._selected_run;
  }

  get_selected_run_id() {
    return this.selected_run_id;
  }

  get_runs():AfoListObservable<any[]>  { // expose a list of available runs
    this._runs = this.afDB.list('/available_runs/' + this._uid);
    return this._runs;   
  }

  get_drop_data() {
    return this._drops_data;
  }

  logout() {
    this._username = '';
    this.selected_run_id = 0;
    //this.afAuth.auth.signOut();
    //this.select_run(0);
    this.afDB.reset(); // flushes local storage .. consider add warning first
    this._runs = null;
    //this._selected_run = null;
    //this.afDB = null;
    
    this.authorized = false;
  }

  get isLoggedIn(): boolean {
    return this._username in this;
  }

  get username(): string {
    return this._username;
  }

  set_signature( sig: String )
  {
    this._sig = sig;
    this._selected_run.update(  this._selected_drop_index.toString(), {"sig": sig} );
    this._selected_run.update(  this._selected_drop_index.toString(), {"status": 1} );
    if (this._platform.is('cordova')) {
      this._selected_run.update(  this._selected_drop_index.toString(), {"sig_lat": this.lat, "sig_lng": this.lng, ts: new Date().toISOString() } );
    }
    //this._selected_run.drops
  }

  get signature(): String {
    return this._sig;
    
  }


  select_drop(i) {
    this._selected_drop_index = i;
    this._selected_drop = this.afDB.list('/user_runs/' + this._uid + '/' + this.selected_run_id + '/drops/' + i );

    // TODO this.navCtrl.setRoot(HomePage);
  }

  get_selected_drop_index() {
    return this._selected_drop_index;
  }

  get_selected_drop() {
    //return this._selected_run[ this._selected_drop_index.valueOf ];
    return this._selected_drop;
  }


  set_run_order_note( t: String )
  {
     this._selected_run.update(  this._selected_drop_index.toString(),  {"notes": t } );
  }

  set_run_order_item( run_order_item_index, is_complete, qty_ordered, qty_delivered ) {
    //console.log('run_order_item_index = ' + run_order_item_index);
    //console.log('is_complete = ' + is_complete );
    let fb_path = this._selected_drop_index.toString() + '/run_order_items/' +  run_order_item_index;
    this._selected_run.update(  fb_path , {"delivered": is_complete} );
    
    /* if qty delivered is less than qty_ordered then update qty_delivered to = qty_ordered */
    if ( (qty_delivered < qty_ordered) && (is_complete==true)  )
      {
        //console.log( 'qty_delivered < qty_ordered) && is_complete so setting qty_delivered to qty_ordered' );
        this._selected_run.update(  fb_path , {"qty_delivered": qty_ordered} );
      }
      else {
        console.log( 'ordered = ' + qty_ordered + '   delivered = ' + qty_delivered);
      }

    /**
    //this.afDB.list('/user_runs/' + this._uid + '/' + run_id + '/drops' )
    let tmp = this.afDB.object('/user_runs/' + this._uid + '/' + this.selected_run_id + '/drops/' + fb_path );
    //tmp.set( 
      
    console.log(tmp);
    console.log(tmp.toJSON);
    console.log(tmp.qty_ordered);
    console.log(tmp.qty_delivered);
    //let tmp = this._selected_run[get()
    //console.log('ordered = ' + this._selected_run.list( fb_path + '/qty_ordered') );
    //console.log('delivered = ' + this._selected_run.list( fb_path + '/qty_delivered') );
    **/

  }

  /**
  loginSuccess( token ) // not used
  {
    alert('success');
  }

  loginError() { // not used
    alert('error)');
  }
  **/

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


       this.afDB.reset();
       this.select_run(0);
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