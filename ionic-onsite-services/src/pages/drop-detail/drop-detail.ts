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
  private item_id;
  private tab  :String;
  private notes: String;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private loginService: LoginService,
    public modalController:ModalController) {
      this.tab ='tasks';
    this.item_id = navParams.get('item_id');  //
    //this.item = loginService.get_selected_drop();
    this.item = navParams.get('item');  //
    //this.item = loginService.get_selected_drop();
    //this.item.fin_time = '2018-10-10 00:00:00';
    //this.item.update( i.toString(), {"status": 0} );
    this.signatureImage = this.item.sig;
   // this.item.update( 'status', 1 );
    //console.log(this.item);
    //set_signature
    //this.signatureImage = navParams.get('signatureImage');
  }

  openSignatureModel(){
    //if ( !this.item.customer_details.fname) { this.item.customer_detilas.fname = ''; }
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


  update_notes() {
    console.log( this.notes );
  }

  updateItemQtyDelivered(i) {
    // NB need to pass through the qtys so that we update the qty_delivered to qty_ordered when checked and qty_deilvered < qty_ordered
    this.loginService.set_run_order_item( i, this.item.run_order_items[i].delivered, this.item.run_order_items[i].qty_ordered, this.item.run_order_items[i].qty_delivered ); // NB assumes that drop number state is in loginService
    
    /*
    if ( this.item.run_order_items[i].delivered === true )
      {
        console.log(i);
        console.log(this.item.run_order_items[i].qty_ordered);
        console.log(this.item.run_order_items[i].delivered);
        console.log('selected drop index from service is ' + this.loginService.get_selected_drop_index()  );
        
      }
      */
  }


}
