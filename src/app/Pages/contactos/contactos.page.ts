import { Component, OnInit } from "@angular/core";
import { ToastController, Platform } from "@ionic/angular";

import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google;

@Component({
  selector: "app-contactos",
  templateUrl: "./contactos.page.html",
  styleUrls: ["./contactos.page.scss"],
})

export class ContactosPage {
  
  address: string;

  markers: any = [
    {
      title: 'Direccion actual',
      latitude: '-17.8126848',
      longitude: '-63.176703999999994'
    },{
      title: 'Direccion Nueva',
      latitude: '-17.8314634',
      longitude: '-63.1830588'
    },{
      title: 'Home',
      latitude: '-17.8391789',
      longitude: '-63.187148'
    }];

  constructor(private toastCtrl: ToastController, private platform: Platform, private geolocation: Geolocation) {}

  infoWindows: any = [];
  map: any;

  ngOnInit() {
    this.platform.ready();
    this.loadMap();
  }

  async loadMap() {
    const rta = await this.geolocation.getCurrentPosition();
    const myLatLng = {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    };
    console.log(myLatLng);

    const mapEle: HTMLElement = document.getElementById('map');
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 15
    });

    this.addMarkersToMap(this.markers);
  }

  addMarkersToMap(markers){
    for (let marker of markers) {
        let position = new google.maps.LatLng(marker.latitude, marker.longitude);
        let mapMarker = new google.maps.Marker({
          position: position,
          title: marker.title,
          latitude: marker.latitude,
          longitude: marker.longitude
        });

        mapMarker.setMap(this.map);
        this.addInfoWindowToMarker(mapMarker);
    }
  }

  addInfoWindowToMarker(marker){
    let infoWindowContent = '<div style="color: black;" class="contenido">' + 
    '<h2 id="firstHeading" class="firstHeading">' + marker.title + '</h2>' + 
    '<p>Latitude: ' + marker.latitude + '</p>' + 
    '<p>Longitude: ' + marker.longitude + '</p>' +
    '</div>';

    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });

    marker.addListener('click', () => {
      this.closeAllWindows();
      infoWindow.open(this.map, marker);
    });
    this.infoWindows.push(infoWindow);
  }

  closeAllWindows(){
    for (let window of this.infoWindows) {
      window.close();
    }
  }

  async showToast(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: "middle",
    });
    toast.present();
  }

  send(){

  }
}
