var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { GoogleMaps, GoogleMapsEvent } from '@ionic-native/google-maps';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
/**
 * Generated class for the MapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var MapPage = (function () {
    function MapPage(navCtrl, navParams, googleMaps, platform, geolocation) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.googleMaps = googleMaps;
        this.platform = platform;
        this.geolocation = geolocation;
        platform.ready().then(function () {
            //
        });
    }
    MapPage.prototype.loadMap = function () {
        this.mapElement = document.getElementById('map');
        var mapOptions = {
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
            .then(function () {
            console.log('Map is ready!');
        });
    };
    MapPage.prototype.ionViewWillEnter = function () {
    };
    MapPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MapPage');
        this.loadMap();
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
            .then(function (marker) {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
                .subscribe(function () {
                alert('clicked');
            });
        });
    };
    return MapPage;
}());
MapPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-map',
        templateUrl: 'map.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams,
        GoogleMaps, Platform,
        Geolocation])
], MapPage);
export { MapPage };
//# sourceMappingURL=map.js.map