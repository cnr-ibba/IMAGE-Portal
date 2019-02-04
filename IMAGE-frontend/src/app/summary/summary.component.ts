import { Component, OnInit } from '@angular/core';

declare var ol: any;
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  map: any;
  longitude = 39.855115;
  latitude = 57.634874;
  baseMapLayer: any;
  marker: any;
  marker1: any;
  marker2: any;
  marker3: any;
  marker4: any;
  marker5: any;
  marker6: any;
  marker7: any;
  marker8: any;
  marker9: any;
  vectorSource: any;
  markerVercotLayer: any;
  public doughnutChartLabels;
  public doughnutChartData;
  public doughnutChartType;

  constructor() { }

  ngOnInit() {
    this.doughnutChartLabels = ['Sus scrofa', 'Capra hircus', 'Cinta Senese'];
    this.doughnutChartData = [350, 450, 100];
    this.doughnutChartType = 'doughnut';

    this.baseMapLayer = new ol.layer.Tile({source: new ol.source.OSM()});
    this.map = new ol.Map({
      target: 'map',
      layers: [this.baseMapLayer],
      view: new ol.View({
        center: ol.proj.fromLonLat([this.longitude, this.latitude]),
        zoom: 2
      })
    });
    this.marker = new ol.Feature({
      geometry: new ol.geom.Point(
        ol.proj.fromLonLat([this.longitude, this.latitude])
      ),
    });
    this.marker1 = new ol.Feature({
      geometry: new ol.geom.Point(
        ol.proj.fromLonLat([57.634874, 39.855115])
      ),
    });
    this.marker2 = new ol.Feature({
      geometry: new ol.geom.Point(
        ol.proj.fromLonLat([58.634874, 37.855115])
      ),
    });
    this.marker3 = new ol.Feature({
      geometry: new ol.geom.Point(
        ol.proj.fromLonLat([55.634874, 35.855115])
      ),
    });
    this.marker4 = new ol.Feature({
      geometry: new ol.geom.Point(
        ol.proj.fromLonLat([27.634874, 29.855115])
      ),
    });
    this.marker5 = new ol.Feature({
      geometry: new ol.geom.Point(
        ol.proj.fromLonLat([47.634874, 49.855115])
      ),
    });
    this.marker6 = new ol.Feature({
      geometry: new ol.geom.Point(
        ol.proj.fromLonLat([17.634874, 19.855115])
      ),
    });
    this.marker7 = new ol.Feature({
      geometry: new ol.geom.Point(
        ol.proj.fromLonLat([67.634874, 69.855115])
      ),
    });
    this.marker8 = new ol.Feature({
      geometry: new ol.geom.Point(
        ol.proj.fromLonLat([87.634874, 89.855115])
      ),
    });
    this.marker9 = new ol.Feature({
      geometry: new ol.geom.Point(
        ol.proj.fromLonLat([81.634874, 19.855115])
      ),
    });
    this.vectorSource = new ol.source.Vector({
      features: [this.marker, this.marker1, this.marker2, this.marker3, this.marker4, this.marker5, this.marker6,
        this.marker7, this.marker8, this.marker9]
    });
    this.markerVercotLayer = new ol.layer.Vector({
      source: this.vectorSource,
    });
    this.map.addLayer(this.markerVercotLayer);
  }

  chartHovered(event: any) {

  }

  chartClicked(event: any) {

  }

}
