import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {TablesService} from '../../tables.service';
import {Title} from '@angular/platform-browser';
import {MatSnackBar} from '@angular/material';

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
  zoom = 1;

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
          this.zoom = 8;
        }
      },
      error => {
        this.error = error;
        this.snackBar.open(this.error, 'close', {
          duration: 5000,
        });
      }
    );

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

  checkExistence(key: string, organism = false) {
    if (organism) {
      return typeof this.data !== 'undefined' && this.data['organisms'][0][key] !== '' &&
        this.data['organisms'][0][key] !== null;
    } else {
      return typeof this.data !== 'undefined' && this.data[key] !== '';
    }
  }

  hasError() {
    return typeof this.error !== 'undefined';
  }

}
