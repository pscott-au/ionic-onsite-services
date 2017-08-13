import { Component }    from '@angular/core';
import { LoginService } from "./login.service";
import {NavController}  from "ionic-angular/index";

@Component({
  templateUrl: 'login.html'
})
export class LoginComponent {



  constructor(private loginService: LoginService, private nav: NavController) {
    // auto login if able
    if (this.loginService.authorized ) // authorised won't be set until the subscribed service completes .. could look at an observer based approach for nav here.
      {
        this.nav.pop();
      }
    //this.items = loginService.items;
  }

  login_firebase_email(username, password) {
    this.loginService.emailLoginFirebase(username,password).subscribe(res => {
   console.log('success');
   this.nav.pop();
 }, error => {
   console.log('error');
 });
    
  }

  login(username, password) {
    this.loginService.login(username,password).subscribe(res => {
   console.log('success');
   if (this.loginService.isLoggedIn )
    {
      this.nav.pop();
    }
   
 }, error => {
   console.log('error');
 });
    
  }
}
