import 'leaflet-draw';

import * as L from 'leaflet';
import * as mapLayers from '@core/constants/index';

import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';

import { CitiesService } from '@core/services/cities.service';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss'],
})
export class LeafletMapComponent implements AfterViewInit {
  private map: L.DrawMap;
  private currentZoomLevel = 16;
  isSatelliteLayer: boolean = false;
  searchText: UntypedFormControl = new UntypedFormControl();
  @Output()
  currentUserCityName = new EventEmitter<string>();
  drawnItems = new L.FeatureGroup();
  enableDraw: boolean = false;
  markerLayer: L.Marker;
  @Output()
  address = new EventEmitter<string>();

  constructor(private citiesService: CitiesService) {}

  private initMap(): void {
    this.map = L.map('map', {
      center: [31.9515694, 35.9239625],
      zoom: this.currentZoomLevel,
      drawControl: true,
    });

    const tiles = L.tileLayer(mapLayers.defaultLayer, {
      maxZoom: 18,
      minZoom: 3,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });

    L.Marker.prototype.options.icon = this.customIcon();
    tiles.addTo(this.map);
    this.map.zoomControl.remove();
    this.map.addLayer(this.drawnItems);
    this.map.removeControl(this.map.zoomControl);
  }

  customIcon() {
    return L.icon({
      shadowUrl: 'assets/img/marker-shadow.png',
      iconUrl: 'assets/img/marker-icon.png',
    });
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
      this.drawnItems.clearLayers();
      const { latitude, longitude, accuracy } = position.coords;
      console.log('success');
      console.log(`Your location: (${latitude},${longitude})`);
      console.log('accuracy', accuracy);
      this.markerLayer = new L.Marker([latitude, longitude]);
      this.drawnItems.addLayer(this.markerLayer);
      this.findCityName(latitude, longitude);
      this.map.setView(new L.LatLng(latitude, longitude), 16);
    }
    function onError() {
      console.log('error');
      console.log('Failed to get your location!');
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

  createMarker() {
    this.enableDraw = false;
    this.drawnItems.clearLayers();
    this.map.on('click', (event: any) => {
      if (this.enableDraw) {
        const coord = event.latlng;
        this.markerLayer = new L.Marker([coord.lat, coord.lng]);
        this.drawnItems.addLayer(this.markerLayer);
        this.map.addLayer(this.drawnItems);
        this.map.off('click');
        this.findCityName(coord.lat, coord.lng);
      }
      this.enableDraw = !this.enableDraw;
      return;
    });
  }

  removeLayers() {
    this.drawnItems.clearLayers();
    this.currentUserCityName.emit('');
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
