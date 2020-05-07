import { Component, OnInit, Inject } from '@angular/core';
import {TablesService} from '../tables/tables.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {ObjectUnsubscribedError, Subject} from 'rxjs';
import {Title} from '@angular/platform-browser';

export interface DialogData {
  species: any;
  active_specie: string;
}

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

  longitude = 11.518580;
  latitude = 48.164689;

  organismSpeciesLabels = [];
  organismSpeciesData = [];
  activeSpecie: any;
  changedSpecie = new Subject();
  breed = {};
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
        type: 'logarithmic',
        ticks: {
          beginAtZero: true,
        }
      }] },
    tooltips: {
      enabled: true,
      mode: 'label',
    }
  };
  organismBreedOptions: ChartOptions = {
    title: {
      text: 'Supplied breed',
      display: true
    },
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{
        display: false
      }], yAxes: [{
        type: 'logarithmic',
        ticks: {
          beginAtZero: true,
        }
      }] },
    tooltips: {
      enabled: true,
      mode: 'label',
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

  constructor(private tableService: TablesService, public dialog: MatDialog, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('IMAGE|Summary');
    this.changedSpecie.subscribe(data => {
      this.activeSpecie = data;
      this.organismBreedOptions['title']['text'] = 'Supplied breed for ' + this.activeSpecie + ' (click to change)';
    });
    this.tableService.getOrganismsGraphicalSummary().subscribe(data => {
      this.organismSpeciesData = Object.values(data['species']);
      this.organismSpeciesLabels = Object.keys(data['species']);

      this.organismCountryData = Object.values(data['countries']);
      this.organismCountryLabels = Object.keys(data['countries']);

      this.breed = data['breeds'];
      this.activeSpecie = Object.keys(this.breed)[0];
      this.organismBreedLabels = Object.keys(this.breed[this.activeSpecie]);
      this.organismBreedData = Object.values(this.breed[this.activeSpecie]);
      this.organismBreedOptions['title']['text'] = 'Supplied breed for ' + this.activeSpecie + ' (click to change)';


      const coordinatesVectorSource = new ol.source.Vector({
        format: new ol.format.GeoJSON()
      });

      for (const coordinates of data['coordinates']) {
        const sample = new ol.Feature({
          geometry: new ol.geom.Point(ol.proj.fromLonLat([+coordinates[0], +coordinates[1]]))
        });
        coordinatesVectorSource.addFeature(sample);
      }

      this.birthBaseMapLayer = new ol.layer.Tile({source: new ol.source.OSM()});
      this.birthBaseMapLayer.setSource(
        new ol.source.OSM({
          url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
          attributions: '© <a href="https://services.arcgisonline.com/arcgis/rest/services">ArcGis Online Services</a>'
        })
      );
      this.birthMap = new ol.Map({
        target: 'birthMap',
        layers: [this.birthBaseMapLayer],
        view: new ol.View({
          center: ol.proj.fromLonLat([this.longitude, this.latitude]),
          zoom: 2.7
        })
      });

      const coordinatesVector = new ol.layer.Vector({
        source: coordinatesVectorSource,
        style: new ol.style.Style({
          image: new ol.style.Circle({
            fill: new ol.style.Fill({color: 'red'}),
            radius: 4
          })
        })
      });

      this.birthMap.addLayer(coordinatesVector);
      this.birthMap.getView().setCenter(ol.proj.fromLonLat([11.518580, 48.164689]));
      this.showOrganismsSummary = true;
    });

    this.tableService.getSpecimensGraphicalSummary().subscribe(data => {
      this.specimenPartData = Object.values(data['organism_part']);
      this.specimenPartLabels = Object.keys(data['organism_part']);

      this.collectionBaseMapLayer = new ol.layer.Tile({source: new ol.source.OSM()});
      this.collectionBaseMapLayer.setSource(
        new ol.source.OSM({
          url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
          attributions: '© <a href="https://services.arcgisonline.com/arcgis/rest/services">ArcGis Online Services</a>'
        })
      );
      this.collectionMap = new ol.Map({
        target: 'collectionMap',
        layers: [this.collectionBaseMapLayer],
        view: new ol.View({
          center: ol.proj.fromLonLat([this.longitude, this.latitude]),
          zoom: 2.7
        })
      });

      const coordinatesVectorSource = new ol.source.Vector({
        format: new ol.format.GeoJSON()
      });

      for (const coordinates of data['coordinates']) {
        const sample = new ol.Feature({
          geometry: new ol.geom.Point(ol.proj.fromLonLat([+coordinates[0], +coordinates[1]]))
        });
        coordinatesVectorSource.addFeature(sample);
      }

      const coordinatesVector = new ol.layer.Vector({
        source: coordinatesVectorSource,
        style: new ol.style.Style({
          image: new ol.style.Circle({
            fill: new ol.style.Fill({color: 'red'}),
            radius: 4
          })
        })
      })

      this.collectionMap.addLayer(coordinatesVector);
      this.collectionMap.getView().setCenter(ol.proj.fromLonLat([11.518580, 48.164689]));

      this.showSpecimensSummary = true;
    });

  }

  chartHovered(event: any) {

  }

  chartClicked(event: any) {
    const dialogRef = this.dialog.open(ChooseSpeciesComponent, {
      width: '250px',
      data: {species: this.organismSpeciesLabels, active_specie: this.activeSpecie}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.activeSpecie = result.active_specie;
        this.organismBreedLabels = Object.keys(this.breed[this.activeSpecie]);
        this.organismBreedData = Object.values(this.breed[this.activeSpecie]);
        this.organismBreedOptions = {
          title: {
            text: 'Supplied breed',
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
        this.changedSpecie.next(this.activeSpecie);
      }
    });

  }

}

@Component({
  selector: 'app-choose-species',
  templateUrl: 'choose-species.html',
  styleUrls: ['./choose-species.css']
})
export class ChooseSpeciesComponent {

  constructor(
    public dialogRef: MatDialogRef<ChooseSpeciesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSpecieClick(data: DialogData, specie: string) {
    data.active_specie = specie;
  }

  chooseClass(data: DialogData, specie: string) {
    if (data.active_specie === specie) {
      return 'active-specie';
    }
  }

}
