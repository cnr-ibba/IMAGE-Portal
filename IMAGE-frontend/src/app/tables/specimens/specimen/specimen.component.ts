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
  zoom = 1;

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
          this.zoom = 8;
          this.map = new ol.Map({
            target: 'map',
            layers: [
              new ol.layer.Tile({
                source: new ol.source.OSM()
              })
            ],
            view: new ol.View({
              center: ol.proj.fromLonLat([this.longitude, this.latitude]),
              zoom: this.zoom
            })
          });
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
