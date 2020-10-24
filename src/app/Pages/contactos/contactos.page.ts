import { Component, OnInit } from "@angular/core";
import { ToastController, Platform } from "@ionic/angular";
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation,
} from "@ionic-native/google-maps";

@Component({
  selector: "app-contactos",
  templateUrl: "./contactos.page.html",
  styleUrls: ["./contactos.page.scss"],
})
export class ContactosPage implements OnInit {
  map: GoogleMap;
  address: string;

  constructor(public toastCtrl: ToastController, private platform: Platform) {}

  ngOnInit() {
    this.platform.ready();
    this.loadMap();
  }

  loadMap() {
    this.map = GoogleMaps.create("map_canvas", {
      // camera: {
      //   target: {
      //     lat: 43.0741704,
      //     lng: -89.3809802
      //   },
      //   zoom: 18,
      //   tilt: 30
      // }
    });
    this.goToMyLocation();
  }

  goToMyLocation() {
    this.map.clear();

    // Get the location of you
    this.map
      .getMyLocation()
      .then((location: MyLocation) => {
        console.log(JSON.stringify(location, null, 2));

        // Move the map camera to the location with animation
        this.map.animateCamera({
          target: location.latLng,
          zoom: 17,
          duration: 5000,
        });

        //add a marker
        let marker: Marker = this.map.addMarkerSync({
          title: "UPL EMPRESA",
          snippet: "Av. prolongación Beni entre 7º y 8º anillo",
          position: location.latLng,
          animation: GoogleMapsAnimation.BOUNCE,
        });

        //show the infoWindow
        marker.showInfoWindow();

        //If clicked it, display the alert
        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          this.showToast("clicked!");
        });

        this.map.on(GoogleMapsEvent.MAP_READY).subscribe((data) => {
          console.log("Click MAP", data);
        });
      })
      .catch((err) => {
        //this.loading.dismiss();
        this.showToast(err.error_message);
      });
  }

  async showToast(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: "middle",
    });
    toast.present();
  }

  send() {}
}