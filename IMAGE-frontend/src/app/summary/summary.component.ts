import { Component, OnInit } from '@angular/core';
import {TablesService} from '../tables/tables.service';

declare var ol: any;
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  birthMap: any;
  birthBaseMapLayer: any;
  birthVectorSource: any;
  birthMarkerVectorLayer: any;

  collectionMap: any;
  collectionBaseMapLayer: any;
  collectionVectorSource: any;
  collectionMarkerVectorLayer: any;

  longitude = 39.855115;
  latitude = 57.634874;

  public doughnutChartLabels;
  public doughnutChartData;
  public doughnutChartType;

  birthCoordinates = [];
  collectionCoordinates = [];

  constructor(private tableService: TablesService) { }

  ngOnInit() {
    this.tableService.getAllOrganisms().subscribe(data => {
      for (const point in data) {
        if (data[point]['birthLocationLatitude'] !== null && data[point]['birthLocationLongitude'] !== null) {
          const latitude = data[point]['birthLocationLatitude'];
          const longitude = data[point]['birthLocationLongitude'];
          const flag = new ol.Feature({
            geometry: new ol.geom.Point(
              ol.proj.fromLonLat([longitude, latitude])
            ),
          });
          this.birthCoordinates.push(flag);
        }
      }
      this.birthBaseMapLayer = new ol.layer.Tile({source: new ol.source.OSM()});
      this.birthMap = new ol.Map({
        target: 'birthMap',
        layers: [this.birthBaseMapLayer],
        view: new ol.View({
          center: ol.proj.fromLonLat([this.longitude, this.latitude]),
          zoom: 2
        })
      });

      this.birthVectorSource = new ol.source.Vector({
        features: this.birthCoordinates
      });
      this.birthMarkerVectorLayer = new ol.layer.Vector({
        source: this.birthVectorSource,
      });
      this.birthMap.addLayer(this.birthMarkerVectorLayer);
    });

    this.tableService.getAllSpecimens().subscribe(data => {
      for (const point in data) {
        if (data[point]['collectionPlaceLatitude'] !== null && data[point]['collectionPlaceLongitude'] !== null) {
          const latitude = data[point]['collectionPlaceLatitude'];
          const longitude = data[point]['collectionPlaceLongitude'];
          const flag = new ol.Feature({
            geometry: new ol.geom.Point(
              ol.proj.fromLonLat([longitude, latitude])
            ),
          });
          this.collectionCoordinates.push(flag);
        }
      }
      this.collectionBaseMapLayer = new ol.layer.Tile({source: new ol.source.OSM()});
      this.collectionMap = new ol.Map({
        target: 'collectionMap',
        layers: [this.collectionBaseMapLayer],
        view: new ol.View({
          center: ol.proj.fromLonLat([this.longitude, this.latitude]),
          zoom: 2
        })
      });

      this.collectionVectorSource = new ol.source.Vector({
        features: this.collectionCoordinates
      });
      this.collectionMarkerVectorLayer = new ol.layer.Vector({
        source: this.collectionVectorSource,
      });
      this.collectionMap.addLayer(this.collectionMarkerVectorLayer);
    });
    // this.doughnutChartLabels = ['Sus scrofa', 'Capra hircus', 'Cinta Senese'];
    // this.doughnutChartData = [350, 450, 100];
    // this.doughnutChartType = 'doughnut';
    //
  }

  chartHovered(event: any) {

  }

  chartClicked(event: any) {

  }

}
