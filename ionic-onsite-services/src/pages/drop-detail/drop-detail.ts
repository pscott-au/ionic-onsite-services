import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import {LoginService} from "../../app/login/login.service";
import {SignaturePage} from '../signature/signature';



@Component({
  selector: 'page-drop-detail',
  templateUrl: 'drop-detail.html',
})
export class DropDetailPage {
  public signatureImage : any;
  private username;
  private item;
  constructor(public navCtrl: NavController, public navParams: NavParams, private loginService: LoginService,
    public modalController:ModalController) {
    this.item = navParams.get('item');
    //this.item.fin_time = '2018-10-10 00:00:00';
    //this.item.update( i.toString(), {"status": 0} );
   // this.item.update( 'status', 1 );
    console.log(this.item);
    //set_signature
    //this.signatureImage = navParams.get('signatureImage');
  }

  openSignatureModel(){
    let chooseModal = this.modalController.create(SignaturePage);
    chooseModal.onDidDismiss(data => {
      this.signatureImage = data;
      this.loginService.set_signature(data);
    });
    chooseModal.present();
    /*
    setTimeout(() => {
       let modal = this.modalController.create(SignaturePage );
    modal.present();
    }, 300);
    */

    //console.log(this.modalController.sig);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DropDetailPage');
  }


  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    if ( this.loginService.username )
      {
        this.username= this.loginService.username;
      }
       //this.items = this.loginService.run_items();
  }

  debug_sig() {
    console.log( this.signatureImage);
  }

}
