/**
 * Generated class for the MapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapOptions,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import {LoginService} from "../../app/login/login.service";
import {  AfoListObservable } from 'angularfire2-offline/database'; // , AngularFireOfflineDatabase
//import { Geolocation } from '@ionic-native/geolocation';



@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  map: GoogleMap;
  private items;
  lat: Number;
  lng: Number;
  mapElement: HTMLElement;
  markers: Array<Marker>;
  //declare var plugin: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private googleMaps: GoogleMaps, public platform: Platform,
              private loginService: LoginService,
              // public geolocation: Geolocation
              ) {
                //this.items = this.loginService.selected_run();
                this.items = [];
                this.lat = loginService.lat;
                this.lng = loginService.lng;
                  //console.log(x[0].drop_details.lat); 
                //
                //console.log(this.items);
    platform.ready().then(() => {
      //
      console.log('platform ready');
    });
  }


   loadMap() {
    this.mapElement = document.getElementById('map');

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: -27.9110622,
          lng: 153.3877903
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = this.googleMaps.create(this.mapElement, mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');
      });
  }


 ionViewWillEnter() {
  this.items = this.loginService.get_drop_data();
  let done_count = 0;
  this.markers = [];
  this.loadMap();
  this.map.clear();
  
  this.items.forEach( drop => { 
     let m_Color = 'red';
     if ( drop.status ==1 )
       {
         m_Color = 'green';
         done_count++;
       }
       this.map.addMarker({
       title: drop.info,
       icon: m_Color,
       animation: 'DROP',
       position: {
         lat: drop.drop_details.lat,
         lng: drop.drop_details.lng
       }
     }).then(marker => {
       marker.on(GoogleMapsEvent.MARKER_CLICK)
         .subscribe(() => {
           alert('clicked');
         });
     });
   });
   console.log('done count = ' + done_count);
 }
 
  ionViewDidLoad() {
    //console.log('ionViewDidLoad MapPage');   
  }

  ionViewWillLeave() {
    this.items = [];
  }


}
