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

/**
 * Generated class for the MapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  map: GoogleMap;
  public items: AfoListObservable<any[]>;

  mapElement: HTMLElement;
  markers: Array<Marker>;
  //declare var plugin: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private googleMaps: GoogleMaps, public platform: Platform,
              private loginService: LoginService
  //             public geolocation: Geolocation
              ) {
                
                this.items = this.loginService.selected_run();

                  //console.log(x[0].drop_details.lat); 

                //
                //console.log(this.items);
    platform.ready().then(() => {
      //
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
  this.items = this.loginService.selected_run();
  this.markers = [];
  this.loadMap();

  this.map.clear();
  //this.map.off();

  this.items.forEach( x=> { 
   for( var drop in x) {
     console.log('create marker at ' +  x[drop].drop_details.lat + ',' + x[drop].drop_details.lng );
     console.log('status  = ' + x[drop].status );
     let m_Color = 'red';
     if ( x[drop].status ==1 )
       {
         m_Color = 'green';
       }
     //this.markers.push(
       this.map.addMarker({
       title: x[drop].info,
       icon: m_Color,
       animation: 'DROP',
       position: {
         lat: x[drop].drop_details.lat,
         lng: x[drop].drop_details.lng
       }
     }).then(marker => {
       marker.on(GoogleMapsEvent.MARKER_CLICK)
         .subscribe(() => {
           alert('clicked');
         });
     });

     //this.markers.push(marker) ;

   };
   }  ); 

   /*
  // Now you can use all methods safely.
     this.map.addMarker({
         title: 'Ionic',
         icon: 'blue',
         animation: 'DROP',
         position: {
           lat: -27.9110622,
           lng: 153.3877903
         }
       })
       .then(marker => {
         marker.on(GoogleMapsEvent.MARKER_CLICK)
           .subscribe(() => {
             alert('clicked');
           });
       });
*/  
 }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');

          

  }



}
