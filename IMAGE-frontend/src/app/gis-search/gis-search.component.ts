import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {TablesService} from '../tables/tables.service';
import {Title} from '@angular/platform-browser';

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
  displayedColumnsOrganisms = ['data_source_id', 'species', 'supplied_breed', 'sex'];
  displayedColumnsSpecimens = ['data_source_id', 'species', 'derived_from', 'organism_part'];
  filter: any;

  constructor(fb: FormBuilder, private tablesService: TablesService, private titleService: Title) {
    this.options = fb.group({
      latitude: this.latitude,
      longitude: this.longitude,
      radius: undefined
    });
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

  doFilter() {
    this.tablesService.OrganismsGISSearch(this.filter['latitude'], this.filter['longitude'], this.filter['radius'])
      .subscribe(data => {
        this.dataSourceOrganism = data['results'];
      });
    this.tablesService.SpecimensGISSearch(this.filter['latitude'], this.filter['longitude'], this.filter['radius'])
      .subscribe(data => {
        this.dataSourceSpecimen = data['results'];
      });
  }

  startSearch() {
    this.filter = this.options.getRawValue();
    this.doFilter();
    this.showResults = true;
  }

}
