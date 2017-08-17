import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginService } from "./login/login.service";
import { LoginComponent } from "./login/login.component";
import { MenuComponent } from "./menu.component";

@Component({
  //templateUrl: 'app.html'
  template: '<ion-nav #baseNav></ion-nav>',
  providers: [LoginService]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private loginService: LoginService) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const componentStack: Array<{page: Component}> = [{
      page: MenuComponent
    }];

    if (!this.loginService.isLoggedIn) {
      componentStack.push({ page: LoginComponent });
    }

    this.nav.insertPages(0, componentStack, { animate: false });
  }

}
