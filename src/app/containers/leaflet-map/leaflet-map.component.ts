import * as L from 'leaflet';
import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements AfterViewInit {
  private map;

  constructor() {}

  private initMap(): void {
    this.map = L.map('map', {
      center: [31.9515694, 35.9239625],
      zoom: 16
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }
    );

    tiles.addTo(this.map);
  }

  ngAfterViewInit(): void {
    this.initMap();
  }
  
  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess.bind(this), onError);
    } else {
      console.log('browser does not support geolocation');
    }
    function onSuccess(position) {
      const { latitude, longitude, accuracy } = position.coords;
      console.log('success');
      console.log(`Your location: (${latitude},${longitude})`);
      console.log('accuracy', accuracy);
      this.map.setView(new L.LatLng(latitude, longitude), 16);
    }
    function onError() {
      console.log('error');
      console.log('Failed to get your location!');
    }
  }
}