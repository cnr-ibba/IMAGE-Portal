import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {TablesService} from '../tables/tables.service';
import {Title} from '@angular/platform-browser';
import {MatTableDataSource} from '@angular/material';

declare var ol: any;
@Component({
  selector: 'app-gis-search',
  templateUrl: './gis-search.component.html',
  styleUrls: ['./gis-search.component.css']
})
export class GisSearchComponent implements OnInit {
  showResults = false;
  options: FormGroup;
  baseMapLayer: any;
  map: any;
  latitude: number;
  longitude: number;
  pointCoordinates = new Subject();
  dataSourceOrganism: any;
  dataSourceSpecimen: any;
  error: any;
  displayedColumnsOrganisms = ['id', 'species', 'breed', 'sex'];
  displayedColumnsSpecimens = ['id', 'species', 'derived', 'organism'];
  filter: any;

  constructor(fb: FormBuilder, private tablesService: TablesService, private titleService: Title) {
    this.options = fb.group({
      latitude: this.latitude,
      longitude: this.longitude,
      radius: undefined
    });
    this.tablesService.getAllOrganismsShort('?page_size=100000').subscribe(
      data => {
        this.dataSourceOrganism = new MatTableDataSource(data);
        this.setFilterOrganism();
      },
      error => {
        this.error = error;
      }
    );
    this.tablesService.getAllSpecimensShort('?page_size=100000').subscribe(
      data => {
        this.dataSourceSpecimen = new MatTableDataSource(data);
        this.setFilterSpecimen();
      },
      error => {
        this.error = error;
      }
    );
  }

  ngOnInit() {
    this.titleService.setTitle('IMAGE|GIS-Search');
    this.pointCoordinates.subscribe(data => {
      this.latitude = data['latitude'];
      this.longitude = data['longitude'];
      this.options.setValue(data);
    });
    const raster = new ol.layer.Tile({
      source: new ol.source.OSM()
    });
    const source = new ol.source.Vector({wrapX: false});
    const vector = new ol.layer.Vector({source: source});
    this.map = new ol.Map({
      layers: [raster, vector],
      target: 'map',
      view: new ol.View({
        center: [975268, 5987031],
        zoom: 5
      })
    });
    const draw = new ol.interaction.Draw({
      source: source,
      type: 'Point'
    });
    draw.on('drawend', (evt) => {
      const currentFeature = evt.feature;
      // this.map.removeInteraction(draw);
      const numFeatures = currentFeature.getGeometry().getCoordinates();
      const c_numFeatures = ol.proj.transform(numFeatures, 'EPSG:3857', 'EPSG:4326');
      const data = {
        latitude: c_numFeatures[1],
        longitude: c_numFeatures[0],
        radius: ''
      };
      this.pointCoordinates.next(data);
    });
    this.map.addInteraction(draw);
  }

  calculateCosLaw(filter_lat, filter_lon, radius, data_lat, data_lon) {
    const result = Math.acos(Math.sin(filter_lat) * Math.sin(data_lat) + Math.cos(filter_lat) *
      Math.cos(data_lat) * Math.cos(data_lon - filter_lon)) * 6371;
    return result < radius;
  }

  convertToRadians(degrees) {
    return degrees * 3.14 / 180;
  }

  setFilterOrganism() {
    this.dataSourceOrganism.filterPredicate = (data, filter) => {
      const filter_lat = this.convertToRadians(+filter['latitude']);
      const filter_lon = this.convertToRadians(+filter['longitude']);
      const radius = +filter['radius'];
      const data_lat = this.convertToRadians(+data.birthLocationLatitude);
      const data_lon = this.convertToRadians(+data.birthLocationLongitude);
      return this.calculateCosLaw(filter_lat, filter_lon, radius, data_lat, data_lon);
    };
  }

  setFilterSpecimen() {
    this.dataSourceSpecimen.filterPredicate = (data, filter) => {
      const filter_lat = this.convertToRadians(+filter['latitude']);
      const filter_lon = this.convertToRadians(+filter['longitude']);
      const radius = +filter['radius'];
      const data_lat = this.convertToRadians(+data.collectionPlaceLatitude);
      const data_lon = this.convertToRadians(+data.collectionPlaceLongitude);
      return this.calculateCosLaw(filter_lat, filter_lon, radius, data_lat, data_lon);
    };
  }

  doFilter() {
    console.log(this.filter);
    this.dataSourceOrganism.filter = this.filter;
    this.dataSourceSpecimen.filter = this.filter;
  }

  startSearch() {
    this.filter = this.options.getRawValue();
    this.doFilter();
    this.showResults = true;
  }

}
