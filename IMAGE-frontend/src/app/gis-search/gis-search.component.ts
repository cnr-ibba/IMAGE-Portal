import { Component, OnInit } from '@angular/core';

declare var ol: any;
@Component({
  selector: 'app-gis-search',
  templateUrl: './gis-search.component.html',
  styleUrls: ['./gis-search.component.css']
})
export class GisSearchComponent implements OnInit {
  longitude = 39.855115;
  latitude = 57.634874;
  baseMapLayer: any;
  map: any;

  constructor() { }

  ngOnInit() {
    this.baseMapLayer = new ol.layer.Tile({source: new ol.source.OSM()});
    this.map = new ol.Map({
      target: 'map',
      layers: [this.baseMapLayer],
      view: new ol.View({
        center: ol.proj.fromLonLat([+this.longitude, +this.latitude]),
        zoom: 6
      })
    });
  }

}
