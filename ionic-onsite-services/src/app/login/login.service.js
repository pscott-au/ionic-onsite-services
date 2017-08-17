var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireOfflineDatabase } from 'angularfire2-offline/database';
import * as firebase from 'firebase/app';
var LoginService = (function () {
    function LoginService(http, afAuth, afDB) {
        var _this = this;
        this.http = http;
        // private available_runs: any[];
        this.authorized = false;
        this.selected_run_id = 0;
        this.configObservable = new Subject();
        this.user = afAuth.authState; // this is v4 version shorter than below as per https://github.com/angular/angularfire2/blob/master/docs/version-4-upgrade.md
        this.afAuth = afAuth;
        this.afDB = afDB;
        //this._items = afDB.list('/cuisines');
        this._selected_run = null;
        afAuth.authState.subscribe(function (user) {
            if (!user) {
                _this.displayName = 'not logged in';
                return;
            }
            else {
                _this.authorized = true;
                _this.displayName = user.displayName;
                //this.email = user.email;
                //console.log('firebase user credentials ok');
                //console.log(user);
                //console.log(this.items[0]);
                //afDB.set
                //alert(user.uid);    
            }
        });
    }
    LoginService.prototype.emitConfig = function (val) {
        console.log('login service set to' + val);
        this.configObservable.next(val);
    };
    LoginService.prototype.select_run = function (run_id) {
        this.selected_run_id = run_id;
        console.log('login.serve run_id selected ' + run_id + ' with uid = ' + this._uid);
        this._selected_run = this.afDB.list('/user_runs/' + this._uid + '/' + run_id + '/drops');
        // TODO this.navCtrl.setRoot(HomePage);
    };
    LoginService.prototype.run_items = function () {
        return this._selected_run;
    };
    LoginService.prototype.get_runs = function () {
        this._runs = this.afDB.list('/available_runs/' + this._uid);
        return this._runs;
    };
    LoginService.prototype.logout = function () {
        this._username = '';
        //this.afAuth.auth.signOut();
        this.afDB.reset(); // flushes local storage .. consider add warning first
        this.authorized = false;
    };
    Object.defineProperty(LoginService.prototype, "isLoggedIn", {
        get: function () {
            return this._username in this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginService.prototype, "username", {
        get: function () {
            return this._username;
        },
        enumerable: true,
        configurable: true
    });
    LoginService.prototype.loginSuccess = function (token) {
        alert('success');
    };
    LoginService.prototype.loginError = function () {
        alert('error)');
    };
    //items(): FirebaseListObservable<any[]> {
    // Login on Firebase given the email and password.
    LoginService.prototype.emailLoginFirebase = function (email, password) {
        var _this = this;
        //this.loadingProvider.show();
        return Observable.create(function (observer) {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(function (success) {
                // this.loadingProvider.hide();
                //alert('good');
                _this.authorized = true;
                //console.log(success.toJSON);
                _this._uid = success.uid;
                _this._username = success.email;
                console.log("Successful login from email with uid = " + success.uid);
                // !PS     this._runs = this.afDB.list('available_runs').child(success.uid);
                //this._runs = this.afDB.list(/'available_runs'); // .child(success.uid).AfoListObservable;
                //
                // !PS removed setting user db profile record for now .. 
                //firebase.database().ref('/userProfile').child(success.uid).set( { ts: 'time' , email: success.email } );
                //.set({ email: success.email });
                //this.displayName = this.afAuth.user.email;
                observer.next();
            })
                .catch(function (error) {
                //alert('bad');
                observer.error();
                //this.loadingProvider.hide();
                //let code = error["code"];
                //this.alertProvider.showErrorMessage(code);
            });
        });
    };
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
    LoginService.prototype.login = function (username, password) {
        var _this = this;
        this._username = username;
        var params = 'USERNAME=' + username + '&PASSWORD=' + password; // + '&run_id=116';
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new RequestOptions({ headers: headers });
        // let url = 'https://shotgundriver.com/cgi-bin/dropmap_login.cgi'; // 'http://192.168.0.13/cgi-bin/ios_alpha_as_json.cgi'
        var url = 'http://192.168.0.13/cgi-bin/dropmap_login.cgi';
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
        return Observable.create(function (observer) {
            //add your http.post code and inside the response add 
            _this.http.post(url, params, options).map(function (res) { return res.json(); }).subscribe(function (data) {
                console.log(data);
            });
            observer.next();
            observer.complete();
        });
    };
    return LoginService;
}());
LoginService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, AngularFireAuth, AngularFireOfflineDatabase])
], LoginService);
export { LoginService };
//# sourceMappingURL=login.service.js.map