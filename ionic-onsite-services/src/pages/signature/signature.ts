//import { Component } from '@angular/core';
//import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { IonicPage,NavController, NavParams, ViewController } from 'ionic-angular';
import {SignaturePad} from 'angular2-signaturepad/signature-pad';
import {HomePage} from '../home/home';
//import {LoginService} from "../../app/login/login.service";




/**
 * Generated class for the SignaturePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-signature',
  templateUrl: 'signature.html',
})
export class SignaturePage {
  @ViewChild(SignaturePad) public signaturePad : SignaturePad;
  
  public signaturePadOptions : Object = {
    'minWidth': 2,
    'canvasWidth': 340,
    'canvasHeight': 200
  };
  public signatureImage : string;
  publiclogin;

  constructor(public navCtrl: NavController, private viewCtrl: ViewController ) { // ,
    //this.item = navParams.get('item');
    //this.login = login;
  }

   //Other Functions

   drawCancel() {
    //this.navCtrl.push(HomePage, {item: this.item });
    this.navCtrl.pop();
  }

   drawComplete() {
    //this.signatureImage = this.signaturePad.toDataURL();
    this.viewCtrl.dismiss( this.signaturePad.toDataURL() );
    //this.navCtrl.pop();
    //this.view
  }

  drawClear() {
    this.signaturePad.clear();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignaturePage');
  }

}
