import * as L from 'leaflet';
import { AfterViewInit, Component } from '@angular/core';
import { CitiesService } from 'src/app/core/services/cities.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss'],
})
export class LeafletMapComponent implements AfterViewInit {
  private map;
  private currentZoomLevel = 16;
  searchText: FormControl = new FormControl();

  constructor(private citiesService: CitiesService) {}

  private initMap(): void {
    this.map = L.map('map', {
      center: [31.9515694, 35.9239625],
      zoom: this.currentZoomLevel,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);
    this.map.zoomControl.remove();
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

  zoomIn(): void {
    let currentZoom = this.map.getZoom();
    this.currentZoomLevel = ++currentZoom;
    this.map.setZoom(this.currentZoomLevel);
  }

  zoomOut(): void {
    let currentZoom = this.map.getZoom();
    this.currentZoomLevel = --currentZoom;
    this.map.setZoom(this.currentZoomLevel);
  }

  search() {
    const searchValue = this.searchText.value;
    this.citiesService.getCityLocation(`${searchValue}`).subscribe(data => {
      const result: any = data;
      if (result.length > 0) {
        this.map.setView(new L.LatLng(result[0].lat, result[0].lon), 16);
      } else {
        this.searchText.setValue('No data found');
      }
    });
  }
}
