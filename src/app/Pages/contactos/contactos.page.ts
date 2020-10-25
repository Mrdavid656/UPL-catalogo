import { Component, OnInit } from "@angular/core";
import { ToastController, Platform } from "@ionic/angular";

import { Geolocation } from "@ionic-native/geolocation/ngx";
import { CallNumber } from '@ionic-native/call-number/ngx';

declare var google;

@Component({
  selector: "app-contactos",
  templateUrl: "./contactos.page.html",
  styleUrls: ["./contactos.page.scss"],
})
export class ContactosPage {

  url:string = "https://wa.me/";

  contactos = [
    {
      nombre: 'Javier Exeni',
      img: 'assets/perfil/perfil.jpg',
      numero: '76632414',
      countrycode: '591'
    },
    {
      nombre: 'Monkey Graphic',
      img: 'assets/perfil/perfil2.jpg',
      numero: '67849167',
      countrycode: '591'
    }
  ]

  address: string;

  markers: any = [
    {
      title: "UPL - Dirección",
      latitude: "-17.740763",
      longitude: "-63.174684",
    }
  ];

  constructor(
    private toastCtrl: ToastController,
    private platform: Platform,
    private geolocation: Geolocation,
    private callNumber: CallNumber
  ) {}

  infoWindows: any = [];
  map: any;

  ngOnInit() {
    this.platform.ready();
    this.loadMap();
  }

  async loadMap() {
    const myLatLng = {
      lat: -17.740763,
      lng: -63.174684,
    };
    console.log(myLatLng);

    const mapEle: HTMLElement = document.getElementById("map");
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 15,
    });

    this.addMarkersToMap(this.markers);
  }

  addMarkersToMap(markers) {
    for (let marker of markers) {
      let position = new google.maps.LatLng(marker.latitude, marker.longitude);
      let mapMarker = new google.maps.Marker({
        position: position,
        title: marker.title,
        latitude: marker.latitude,
        longitude: marker.longitude,
      });

      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker);
    }
  }

  addInfoWindowToMarker(marker) {
    let infoWindowContent =
      '<div style="color: black;" class="contenido">' +
      '<h2 id="firstHeading" class="firstHeading">' +
      marker.title +
      "</h2>" +
      "<p>Latitude: " +
      marker.latitude +
      "</p>" +
      "<p>Longitude: " +
      marker.longitude +
      "</p>" +
      "</div>";

    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent,
    });

    marker.addListener("click", () => {
      this.closeAllWindows();
      infoWindow.open(this.map, marker);
    });
    this.infoWindows.push(infoWindow);
  }

  closeAllWindows() {
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

  // Aqui se deberia poder crear un mensaje y pasar la consulta a un gmail estatico.
  send() {
    console.log('Mensaje Enviado.');
  }


  // Aqui recibe el número para hacer la llamada
  call(numero: string, ){
    this.callNumber.callNumber(numero, true);
  }

  // Aqui recibe el numero y el codigo del país para poder redirigirse a whatsapp
  openWssp(numero: string, code: string){
    let newUrl = this.url+code+numero;
    window.open(newUrl);
  }

}
