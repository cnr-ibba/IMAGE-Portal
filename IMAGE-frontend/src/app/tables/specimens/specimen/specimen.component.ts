import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {TablesService} from '../../tables.service';
import {Title} from '@angular/platform-browser';
import {MatSnackBar} from '@angular/material';

declare var ol: any;
@Component({
  selector: 'app-specimen',
  templateUrl: './specimen.component.html',
  styleUrls: ['./specimen.component.css']
})
export class SpecimenComponent implements OnInit {
  id: string;
  data;
  error: any;
  map: any;
  longitude = 39.855115;
  latitude = 57.634874;
  baseMapLayer: any;
  marker: any;
  vectorSource: any;
  markerVercotLayer: any;

  constructor(private route: ActivatedRoute, private tablesService: TablesService,
              private titleService: Title, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.titleService.setTitle(`${this.id} | IMAGE specimen`);
    });
    this.tablesService.getSpecimen(this.id).subscribe(
      data => {
        this.data = data;
        if (this.checkExistence('collection_place_latitude', true) &&
          this.checkExistence('collection_place_longitude', true)) {
          this.latitude = data['specimens'][0]['collection_place_latitude'];
          this.longitude = data['specimens'][0]['collection_place_longitude'];
          this.baseMapLayer = new ol.layer.Tile({source: new ol.source.OSM()});
          this.map = new ol.Map({
            target: 'map',
            layers: [this.baseMapLayer],
            view: new ol.View({
              center: ol.proj.fromLonLat([+this.longitude, +this.latitude]),
              zoom: 6
            })
          });
          this.marker = new ol.Feature({
            geometry: new ol.geom.Point(
              ol.proj.fromLonLat([+this.longitude, +this.latitude])
            ),
          });
          this.vectorSource = new ol.source.Vector({
            features: [this.marker]
          });
          this.markerVercotLayer = new ol.layer.Vector({
            source: this.vectorSource,
          });
          this.map.addLayer(this.markerVercotLayer);
        }
      },
      error => {
        this.error = error;
        this.snackBar.open(this.error, 'close', {
          duration: 5000,
        });
      }
      );
  }

  checkExistence(key: string, organism = false) {
    if (organism) {
      return typeof this.data !== 'undefined' && this.data['specimens'][0][key] !== '' &&
        this.data['specimens'][0][key] !== null;
    } else {
      return typeof this.data !== 'undefined' && this.data[key] !== '';
    }
  }

  hasError() {
    return typeof this.error !== 'undefined';
  }

}
