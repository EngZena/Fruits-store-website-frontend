/* eslint-disable no-console */
import * as L from 'leaflet';
import * as mapLayers from '@user/core/constants/index';

import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';

import { CitiesService } from '@user/core/services/cities.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss'],
})
export class LeafletMapComponent implements AfterViewInit {
  private map;
  private currentZoomLevel = 16;
  isSatelliteLayer: boolean = false;
  searchText: FormControl = new FormControl();
  @Output()
  currentUserCityName = new EventEmitter<string>();

  constructor(private citiesService: CitiesService) {}

  private initMap(): void {
    this.map = L.map('map', {
      center: [31.9515694, 35.9239625],
      zoom: this.currentZoomLevel,
    });

    const tiles = L.tileLayer(mapLayers.defaultLayer, {
      maxZoom: 18,
      minZoom: 3,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });

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
      new L.Marker([latitude, longitude]).addTo(this.map);
      this.findCityName(latitude, longitude);
      this.map.setView(new L.LatLng(latitude, longitude), 16);
    }
    function onError() {
      console.error('error');
      console.error('Failed to get your location!');
    }
  }

  findCityName(latitude: number, longitude: number) {
    this.citiesService.getCityName(latitude, longitude).subscribe(data => {
      const result: any = data;
      this.currentUserCityName.emit(result.display_name);
    });
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

  toggleMapLayer() {
    let currentLayer = mapLayers.defaultLayer;
    if (this.isSatelliteLayer) {
      currentLayer = mapLayers.defaultLayer;
      this.toggleSatelliteLayer();
    } else {
      currentLayer = mapLayers.satelliteLayer;
      this.toggleSatelliteLayer();
    }
    const tiles = L.tileLayer(currentLayer);
    tiles.addTo(this.map);
  }

  toggleSatelliteLayer() {
    this.isSatelliteLayer = !this.isSatelliteLayer;
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
