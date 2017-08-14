import { Component } from '@angular/core';
import { LoginService } from "./login.service";
import { LoginComponent } from "./login.component";
import {NavController} from "ionic-angular/index";

@Component({
  selector: 'lsd-logout',
  template: '<button ion-button small color="light" (click)="logout()"><ion-icon name="exit"></ion-icon>&nbsp;Logout</button>'
})
export class LogoutComponent {
  username: string;

  constructor(private loginService: LoginService, private navController: NavController) {}

  logout() {
    this.loginService.logout();
    this.navController.push(LoginComponent);
  }
}
