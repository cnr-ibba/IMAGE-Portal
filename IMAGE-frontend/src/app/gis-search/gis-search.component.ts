import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material';
import { zip } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';

import { Feature } from 'geojson';

// leaflet modules
import * as L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet-easybutton';

// coordinates extension
import 'leaflet.coordinates/dist/Leaflet.Coordinates-0.1.5.src.js';

import {
  CdpService,
  GeoOrganism,
  GeoSpecimen,
  organismDescription,
  specimenDescription,
  OrganismsResponse,
  SpecimensResponse
} from './cdp.service';

import { MapService } from './map.service';

@Component({
  selector: 'app-gis-search',
  templateUrl: './gis-search.component.html',
  styleUrls: ['./gis-search.component.css']
})
export class GisSearchComponent implements OnInit {
  // this will listen for the sideNav local reference on html template. I can
  // manage the mat-sidenav using this property
  @ViewChild('sideNav', {static: false}) public sideNav: MatSidenav;

  // start with angular material forms
  filterForm: FormGroup;

  // this will be my geojson layers
  organismsLyr: L.GeoJSON;
  specimensLyr: L.GeoJSON;

  // this will be my selected layer
  selectedItem: L.GeoJSON;

  // here I will track data to visualize tables
  organismsData: GeoOrganism[];
  specimensData: GeoSpecimen[];

  // two flags to determine if I'm waiting for data or not
  isFetchingOrganisms = false;
  isFetchingSpecimens = false;

  // for the accordion(?), track the status of organism panel (example)
  panelOpenState = false;

  // Marker cluster stuff
  markerClusterGroup: L.MarkerClusterGroup;
  markerClusterData: L.Marker[] = [];
  markerClusterOptions: L.MarkerClusterGroupOptions;

  constructor(
    public cdpService: CdpService,
    public mapService: MapService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.collectData();

    // initialize form
    this.filterForm = new FormGroup({
      idControl: new FormControl(this.cdpService.selectedId),
      specieControl: new FormControl(this.cdpService.selectedSpecie),
      breedControl: new FormControl(this.cdpService.selectedBreed),
      partControl: new FormControl(this.cdpService.selectedPart)
    });
  }

  private _filterBreed(value: string): string[] {
    if (value == null) {
      // TODO: workaround to be able to reset form using autocomplete
      return this.cdpService.uniqueSpecies;
    }

    const filterValue = value.toLowerCase();
    return this.cdpService.uniqueBreeds.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterSpecie(value: string): string[] {
    if (value == null) {
      // TODO: workaround to be able to reset form using autocomplete
      return this.cdpService.uniqueSpecies;
    }

    const filterValue = value.toLowerCase();
    return this.cdpService.uniqueSpecies.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterParts(value: string): string[] {
    if (value == null) {
      // TODO: workaround to be able to reset form using autocomplete
      return this.cdpService.uniqueSpecies;
    }

    const filterValue = value.toLowerCase();
    return this.cdpService.uniqueParts.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterIds(value: string): string[] {
    if (value == null) {
      // TODO: workaround to be able to reset form using autocomplete
      return this.cdpService.uniqueIds;
    }

    const filterValue = value.toLowerCase();
    return this.cdpService.uniqueIds.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  onMapReady(leafletMap: L.Map) {
    this.mapService.onMapReady(leafletMap);

    // this is the sideNav which appears on the right when clicking the
    // search icon button on the map

    // defining the custombuttom here and assigning it to my map after it is ready
    // is the only way to toggle the material sidenav using leaflet.easybutton
    const customButton = L.easyButton(
      '<i style="font-size:18px;" class="material-icons">search</i>',
      () => {
        this.sideNav.toggle();
      }
    );
    customButton.options.position = 'bottomright'; // topleft, topright, bottomleft, bottomright

    customButton.addTo(this.mapService.map);

  }

  markerClusterReady(group: L.MarkerClusterGroup) {
    // Do stuff with group
    this.markerClusterGroup = group;

    const key = 'IMAGE samples';
    this.mapService.layersControl.overlays[key] = this.markerClusterGroup;
  }

  private selectByCircle(circleLayer: L.Circle) {
    // create a custom query and set data into CDP service
    const point = circleLayer.getLatLng();

    // set variables in service for search
    this.cdpService.selectedCircle.lat = point.lat;
    this.cdpService.selectedCircle.lng = point.lng;
    this.cdpService.selectedCircle.rad = Math.round(circleLayer.getRadius() / 1000); // get radius in Km

    // console.log([lat, lng, rad]);

    // erase all data selected on map
    this.clearData();

    // fetching data using coordinates stored in CDP service
    this.collectData(false);
  }

  public onDrawCreated(e: L.DrawEvents.Created) {
    const circleLayer = (e.layer as L.Circle);
    this.mapService.drawnItems.addLayer(circleLayer);

    // select data using the drawn circle
    this.selectByCircle(circleLayer);
  }

  public resetCDPselectedCircle(): void {
    this.cdpService.selectedCircle.lat = null;
    this.cdpService.selectedCircle.lng = null;
    this.cdpService.selectedCircle.rad = null;
  }

  public onDrawStart(e: L.DrawEvents.DrawStart) {
    // clear up items from drawn layer
    this.mapService.drawnItems.clearLayers();

    // rest circlelocation in CDP
    this.resetCDPselectedCircle();

    // tslint:disable-next-line:no-console
    // console.log('Draw Started Event!', e);
  }

  public onDrawDeleted(e: L.DrawEvents.Deleted) {
    // console.log('deleted event!!', e);

    // erase all data selected on map
    this.clearData();

    // rest circlelocation in CDP
    this.resetCDPselectedCircle();

    // read all data again
    this.collectData();
  }

  public onDrawEdited(e: L.DrawEvents.Edited) {
    // tslint:disable-next-line:no-console
    // console.log('Draw Edited Event!', e);

    // get the modified circleLayer
    const circleLayer = (this.mapService.drawnItems.getLayers()[0] as L.Circle);

    // select data using the drawn circle
    this.selectByCircle(circleLayer);
  }

  private updateUniqueSpecies(species: string[]) {
    // add new species to uniqueSpecies array
    species.forEach((item: string) => {
      if (! this.cdpService.uniqueSpecies.includes(item)) {
        // console.log(`Add ${item} to unique species`);
        this.cdpService.uniqueSpecies.push(item);
      }
    });
  }

  private updateUniqueIds(ids: string[]) {
    // add new species to uniqueSpecies array
    ids.forEach((item: string) => {
      if (! this.cdpService.uniqueIds.includes(item)) {
        // console.log(`Add ${item} to unique ids`);
        this.cdpService.uniqueIds.push(item);
      }
    });
  }

  readOrganisms(data: OrganismsResponse): number {
    this.organismsLyr = data.organismsLyr;
    this.organismsData = data.organismsData;
    this.cdpService.uniqueBreeds = data.uniqueBreeds;

    // count number of selected features
    const count = this.organismsLyr.getLayers().length;

    // add new species to uniqueSpecies array
    this.updateUniqueSpecies(data.uniqueSpecies);

    // add new unique ids to list
    this.updateUniqueIds(data.uniqueIds);

    // add organisms layer to marker cluster group
    this.markerClusterGroup.addLayer(this.organismsLyr);

    // set flag values
    this.isFetchingOrganisms = false;

    return count;
  }

  readSpecimens(data: SpecimensResponse): number {
    this.specimensLyr = data.specimensLyr;
    this.specimensData = data.specimensData;
    this.cdpService.uniqueParts = data.uniqueParts;

    // count number of selected features
    const count = this.specimensLyr.getLayers().length;

    // add new species to uniqueSpecies array
    this.updateUniqueSpecies(data.uniqueSpecies);

    // add new unique ids to list
    this.updateUniqueIds(data.uniqueIds);

    // add organisms layer to marker cluster group
    this.markerClusterGroup.addLayer(this.specimensLyr);

    // set flag values
    this.isFetchingSpecimens = false;

    return count;
  }

  public collectData(fitOnMap: boolean = true): void {
    // setting flag values (will be resetted by this.readOrganisms and this.readSpecimens)
    this.isFetchingOrganisms = true;
    this.isFetchingSpecimens = true;

    // After all observables emit, emit values as an array
    const CDPfetch = zip(
      this.cdpService.getOrganisms(),
      this.cdpService.getSpecimens()
    );

    CDPfetch.subscribe(
      (data) => {
        // deal with organism data
        const organisms_count = this.readOrganisms(data[0]);

        // deal with specimen data
        const specimens_count = this.readSpecimens(data[1]);

        // report how many objects we get
        const total_count = organisms_count + specimens_count;

        this.snackBar.open(`${total_count} objects found`, 'close', {
          duration: 3000,
        });

        // initialize filters
        this.cdpService.filteredSpecies = this.filterForm.get('specieControl').valueChanges.pipe(
          startWith(''),
          map(value  => this._filterSpecie(value))
        );

        this.cdpService.filteredBreeds = this.filterForm.get('breedControl').valueChanges.pipe(
          startWith(''),
          map(value => this._filterBreed(value))
        );

        this.cdpService.filteredParts = this.filterForm.get('partControl').valueChanges.pipe(
          startWith(''),
          map(value => this._filterParts(value))
        );

        this.cdpService.filteredIds = this.filterForm.get('idControl').valueChanges.pipe(
          startWith(''),
          map(value => this._filterIds(value))
        );

        // zoom map on group (if after select I have any group)
        if (fitOnMap) {
          // try to determine appropriates bounds
          let bounds: L.LatLngBoundsExpression;

          if (this.markerClusterGroup.getLayers().length > 0) {
            // case: I have selected some items, maybe with search, maybe with circle
            if (this.mapService.drawnItems.getLayers().length > 0) {
              // I have drawn a circle and I have features selected. Focus on circle
              bounds = this.mapService.drawnItems.getBounds();
            } else {
              // focus on features instead
              bounds = this.markerClusterGroup.getBounds();
            }

            // fit on selected bounds
            this.mapService.map.fitBounds(bounds, {
              padding: L.point(24, 24),
              maxZoom: 12,
              animate: true
            });

          } else {
            // case: no items selected. Did I draw a circle on map?
            if (this.mapService.drawnItems.getLayers().length > 0) {
              // I have drawn a circle and I have features selected. Focus on circle
              bounds = this.mapService.drawnItems.getBounds();

              // fit on selected bounds
              this.mapService.map.fitBounds(bounds, {
                padding: L.point(24, 24),
                maxZoom: 12,
                animate: true
              });
            }
          }
        }
      },
      error => {
        console.log(error.message);
      }
    );

  }

  clearData() {
    // erase markercluster layers
    this.markerClusterGroup.clearLayers();

    // remove organismsLyr and specimensLyr
    this.organismsLyr.clearLayers();
    this.specimensLyr.clearLayers();
  }

  onSelectedOrganism(geoOrganism: GeoOrganism) {
    // console.log(geoOrganism);
    this.addSelected(geoOrganism);
    this.selectedItem.bindTooltip(organismDescription(geoOrganism));
  }

  onSelectedSpecimen(geoSpecimen: GeoSpecimen) {
    // console.log(geoSpecimen);
    this.addSelected(geoSpecimen);
    this.selectedItem.bindTooltip(specimenDescription(geoSpecimen));
  }

  private addSelected(feature: Feature) {
    // the layer key
    const key = 'Selected item';

    // test if there is already a selected item
    if (key in this.mapService.layersControl.overlays) {
      // remove selected item
      this.selectedItem.clearLayers();
    }

    // read received GeoJSON object, Define manually the marker in order to set
    // the correct urls for icon images
    this.selectedItem = L.geoJSON(
      feature,
      {
        pointToLayer: (geojson, latlng) => {
          return L.marker(
            latlng, {
              icon: L.icon({
                iconSize: [ 25, 41 ],
                iconAnchor: [ 13, 41 ],
                iconUrl: 'leaflet/marker-icon.png',
                shadowUrl: 'leaflet/marker-shadow.png'
              })
            }
          );
        }
      }
    );

    // add marker to map
    this.mapService.map.addLayer(this.selectedItem);

    // center map on feature
    this.mapService.map.fitBounds(this.selectedItem.getBounds(), {
      padding: L.point(6, 6),
      maxZoom: 12,
      animate: true
    });

    // add layer to control
    this.mapService.layersControl.overlays[key] = this.selectedItem;
  }

  onSubmitForm() {
    // console.log(this.filterForm);
    // console.log(this.filterForm.value.specieControl);

    // closing sideNav
    this.sideNav.close();

    // setting value for selected items
    this.cdpService.setSelected({
      selectedSpecie: this.filterForm.value.specieControl,
      selectedBreed: this.filterForm.value.breedControl,
      selectedPart: this.filterForm.value.partControl,
      selectedId: this.filterForm.value.idControl
    });

    // erase all data selected on map
    this.clearData();

    // read all data again
    this.collectData();

    // log cdpService properties
    // console.log(this.cdpService.selectedSpecie);
    // console.log(this.cdpService.selectedBreed);
    // console.log(this.cdpService.selectedPart);
  }

  onResetForm() {
    // console.log(this.filterForm);

    // closing sideNav
    this.sideNav.close();

    // resetting value for selected items
    this.cdpService.resetSelected();

    // erase all data selected on map
    this.clearData();

    // read all data again
    this.collectData();

    // reset form to initial state
    this.filterForm.reset();
  }

}
