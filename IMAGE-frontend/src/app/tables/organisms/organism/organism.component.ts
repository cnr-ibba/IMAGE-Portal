import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {TablesService} from '../../tables.service';
import {Title} from '@angular/platform-browser';
import {MatSnackBar} from '@angular/material';
import {breedsNames, specialBreedCases, speciesNames} from '../species';
import {countries} from '../../countries';

declare var ol: any;
@Component({
  selector: 'app-organism',
  templateUrl: './organism.component.html',
  styleUrls: ['./organism.component.css']
})
export class OrganismComponent implements OnInit {
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
  countries = countries;

  constructor(private route: ActivatedRoute, private tablesService: TablesService,
              private titleService: Title, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.titleService.setTitle(`${this.id} | IMAGE organism`);
    });
    this.tablesService.getOrganism(this.id).subscribe(
      data => {
        this.data = data;
        if (this.checkExistence('birth_location_latitude', true) &&
          this.checkExistence('birth_location_longitude', true)) {
          this.latitude = data['organisms'][0]['birth_location_latitude'];
          this.longitude = data['organisms'][0]['birth_location_longitude'];
          this.baseMapLayer = new ol.layer.Tile({source: new ol.source.OSM()});
          this.baseMapLayer.setSource(
            new ol.source.OSM({
              url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
              attributions: '© <a href="https://services.arcgisonline.com/arcgis/rest/services">ArcGis Online Services</a>'
            })
          );
          this.map = new ol.Map({
            target: 'map',
            layers: [this.baseMapLayer],
            view: new ol.View({
              center: ol.proj.fromLonLat([+this.longitude, +this.latitude]),
              zoom: 10
            })
          });
          const coordinatesVectorSource = new ol.source.Vector({
            format: new ol.format.GeoJSON()
          });
          const sample = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat([+this.longitude, +this.latitude]))
          });
          coordinatesVectorSource.addFeature(sample);
          const coordinatesVector = new ol.layer.Vector({
            source: coordinatesVectorSource,
            style: new ol.style.Style({
              image: new ol.style.Circle({
                fill: new ol.style.Fill({color: 'red'}),
                radius: 4
              })
            })
          });
          this.map.addLayer(coordinatesVector);
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
      return typeof this.data !== 'undefined' && this.data['organisms'][0][key] !== '' &&
        this.data['organisms'][0][key] !== null && this.data['organisms'][0][key].length !== 0;
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

  getBreedLink(breedName: string, species: string) {
    if (breedsNames[species].indexOf(breedName) !== -1) {
      return 'https://dadis-breed-4eff5.firebaseapp.com/?country=Netherlands&specie=' +
        speciesNames[species] + '&breed=' + breedName + '&callback=allbreeds';
    } else if (specialBreedCases.hasOwnProperty(breedName)) {
      return 'https://dadis-breed-4eff5.firebaseapp.com/?country=Netherlands&specie=' +
        speciesNames[species] + '&breed=' + specialBreedCases[breedName] + '&callback=allbreeds';
    }
  }

  speciesIsKnown(breedName: string, species: string) {
    if (speciesNames.hasOwnProperty(species)) {
      if (breedsNames[species].indexOf(breedName) !== -1 || specialBreedCases.hasOwnProperty(breedName)) {
        return true;
      }
      return false;
    }
    return false;
  }

  countryInEugena(countryName: string) {
    return this.countries.hasOwnProperty(countryName);
  }

  generateLink(url: string) {
    return `http://www.ebi.ac.uk/ols/terms?iri=${url}`;
  }

}
