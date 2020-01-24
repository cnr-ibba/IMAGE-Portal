import { Component, OnInit } from '@angular/core';
import {TablesService} from '../tables/tables.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

declare var ol: any;
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  public barChartPlugins = [pluginDataLabels];

  showOrganismsSummary = false;
  showSpecimensSummary = false;
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

  public doughnutChartType;

  birthCoordinates = [];
  collectionCoordinates = [];

  organismSpeciesLabels = [];
  organismSpeciesData = [];
  organismBreedLabels = [];
  organismBreedData = [];
  organismCountryLabels = [];
  organismCountryData = [];

  specimenSpeciesLabels = [];
  specimenSpeciesData = [];
  specimenPartLabels = [];
  specimenPartData = [];
  specimenCountryLabels = [];
  specimenCountryData = [];

  organismSpeciesOptions: ChartOptions = {
    title: {
      text: 'Species',
      display: true
    },
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{
        display: false
      }], yAxes: [{
        ticks: {
          beginAtZero: true,
        }
      }] },
    tooltips: {
      enabled: true,
      mode: 'label',
    }
  };
  organismBreedOptions = {
    title: {
      text: 'Supplied breed',
      display: true
    }
  };
  specimenPartOptions = {
    title: {
      text: 'Organism part',
      display: true
    }
  };
  organismCountryOptions = {
    title: {
      text: 'Gene bank country',
      display: true
    }
  };

  maleOrganisms = 0;
  femaleOrganisms = 0;
  totalOrganisms = 0;
  otherOrganisms = 0;
  totalSpecimens = 0;

  constructor(private tableService: TablesService) { }

  ngOnInit() {
    this.tableService.getAllOrganismsShort().subscribe(data => {
      const species = {};
      const breed = {};
      const country = {};
      this.totalOrganisms = data.length;
      for (const point in data) {
        if (data[point]['birthLocationLatitude'] !== null && data[point]['birthLocationLongitude'] !== null) {
          const latitude = +data[point]['birthLocationLatitude'];
          const longitude = +data[point]['birthLocationLongitude'];
          this.latitude = latitude;
          this.longitude = longitude;
          const flag = new ol.Feature({
            geometry: new ol.geom.Point(
              ol.proj.fromLonLat([longitude, latitude])
            ),
          });
          this.birthCoordinates.push(flag);
        }
        species.hasOwnProperty(data[point]['species']) ? species[data[point]['species']] += 1 :
          species[data[point]['species']] = 1;
        breed.hasOwnProperty(data[point]['breed']) ? breed[data[point]['breed']] += 1 : breed[data[point]['breed']] = 1;
        country.hasOwnProperty(data[point]['efabisBreedCountry']) ? country[data[point]['efabisBreedCountry']] += 1 :
          country[data[point]['efabisBreedCountry']] = 1;
        if (data[point]['sex'] === 'male') {
          this.maleOrganisms += 1;
        } else if (data[point]['sex'] === 'female') {
          this.femaleOrganisms += 1;
        } else {
          this.otherOrganisms += 1;
        }
      }

      this.organismSpeciesLabels = Object.keys(species);
      this.organismSpeciesData = Object.values(species);
      console.log(this.organismSpeciesData);
      console.log(this.organismSpeciesLabels);
      this.organismBreedLabels = Object.keys(breed);
      this.organismBreedData = Object.values(breed);
      this.organismCountryLabels = Object.keys(country);
      this.organismCountryData = Object.values(country);

      this.birthBaseMapLayer = new ol.layer.Tile({source: new ol.source.OSM()});
      this.birthMap = new ol.Map({
        target: 'birthMap',
        layers: [this.birthBaseMapLayer],
        view: new ol.View({
          center: ol.proj.fromLonLat([this.longitude, this.latitude]),
          zoom: 2.7
        })
      });

      this.birthVectorSource = new ol.source.Vector({
        features: this.birthCoordinates
      });
      this.birthMarkerVectorLayer = new ol.layer.Vector({
        source: this.birthVectorSource,
      });
      this.birthMap.addLayer(this.birthMarkerVectorLayer);
      this.birthMap.getView().setCenter(ol.proj.fromLonLat([11.518580, 48.164689]));
      this.showOrganismsSummary = true;
    });

    this.tableService.getAllSpecimensShort().subscribe(data => {
      const species = {};
      const part = {};
      const country = {};
      this.totalSpecimens = data.length;
      for (const point in data) {
        if (data[point]['collectionPlaceLatitude'] !== null && data[point]['collectionPlaceLongitude'] !== null) {
          const latitude = +data[point]['collectionPlaceLatitude'];
          const longitude = +data[point]['collectionPlaceLongitude'];
          this.latitude = latitude;
          this.longitude = longitude;
          const flag = new ol.Feature({
            geometry: new ol.geom.Point(
              ol.proj.fromLonLat([longitude, latitude])
            ),
          });
          this.collectionCoordinates.push(flag);
        }
        species.hasOwnProperty(data[point]['species']) ? species[data[point]['species']] += 1 :
          species[data[point]['species']] = 1;
        part.hasOwnProperty(data[point]['organismPart']) ? part[data[point]['organismPart']] += 1 :
          part[data[point]['organismPart']] = 1;
        country.hasOwnProperty(data[point]['geneBankCountry']) ? country[data[point]['geneBankCountry']] += 1 :
          country[data[point]['geneBankCountry']] = 1;
      }

      this.specimenSpeciesLabels = Object.keys(species);
      this.specimenSpeciesData = Object.values(species);
      this.specimenPartLabels = Object.keys(part);
      this.specimenPartData = Object.values(part);
      this.specimenCountryLabels = Object.keys(country);
      this.specimenCountryData = Object.values(country);

      this.collectionBaseMapLayer = new ol.layer.Tile({source: new ol.source.OSM()});
      this.collectionMap = new ol.Map({
        target: 'collectionMap',
        layers: [this.collectionBaseMapLayer],
        view: new ol.View({
          center: ol.proj.fromLonLat([this.longitude, this.latitude]),
          zoom: 2.7
        })
      });

      this.collectionVectorSource = new ol.source.Vector({
        features: this.collectionCoordinates
      });
      this.collectionMarkerVectorLayer = new ol.layer.Vector({
        source: this.collectionVectorSource,
      });
      this.collectionMap.addLayer(this.collectionMarkerVectorLayer);
      this.collectionMap.getView().setCenter(ol.proj.fromLonLat([11.518580, 48.164689]));
      this.showSpecimensSummary = true;
    });
    this.doughnutChartType = 'doughnut';

  }

  chartHovered(event: any) {

  }

  chartClicked(event: any) {

  }

}
