import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {TablesService} from '../../tables.service';
import {Title} from '@angular/platform-browser';
import {MatSnackBar} from '@angular/material';
import * as FileSaver from 'file-saver';
import {countries} from '../../countries';


declare var ol: any;
@Component({
  selector: 'app-specimen',
  templateUrl: './specimen.component.html',
  styleUrls: ['./specimen.component.css']
})
export class SpecimenComponent implements OnInit {
  displayedColumns = ['filename', 'file_size', 'file_checksum', 'file_checksum_method',
    'index', 'index_size', 'index_checksum', 'index_checksum_method'];
  id: string;
  data;
  files: any;
  urls = [];
  error: any;
  map: any;
  longitude = 39.855115;
  latitude = 57.634874;
  baseMapLayer: any;
  marker: any;
  vectorSource: any;
  markerVercotLayer: any;
  countries = countries;

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
              zoom: 10
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
        this.data['specimens'][0][key] !== null && this.data['specimens'][0][key].length !== 0;
    } else {
      return typeof this.data !== 'undefined' && this.data[key] !== '' && this.data[key].length !== 0;
    }
  }

  hasError() {
    return typeof this.error !== 'undefined';
  }

  convertArrayToStr(arrayToConvert) {
    return arrayToConvert.join(', ');
  }

  formatEmailStr(emailStr) {
    return emailStr.split('mailto:')[1];
  }

  getOntologyField(fieldName) {
    const dataToReturn = [];
    for (let i = 0; i < this.data[fieldName].length; i++) {
      dataToReturn.push(
        {
          'text': this.data[fieldName][i],
          'ontology': this.data[fieldName + '_ontology'][i]
        }
      );
    }
    return dataToReturn;
  }

  countryInEugena(countryName: string) {
    return this.countries.hasOwnProperty(countryName);
  }

  downloadData() {
    this.urls.forEach(url => FileSaver.saveAs(url));
  }

  generateLink(url: string) {
    return `http://www.ebi.ac.uk/ols/terms?iri=${url}`;
  }

}
