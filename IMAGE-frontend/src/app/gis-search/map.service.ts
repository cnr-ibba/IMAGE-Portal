import { Injectable } from '@angular/core';

import * as L from 'leaflet';

// geotiff extensions
import plotty from 'plotty';
import GeoTIFF from 'geotiff';
import 'geotiff-layer-leaflet/dist/geotiff-layer-leaflet';
import 'geotiff-layer-leaflet/src/geotiff-layer-leaflet-plotty';
import 'geotiff-layer-leaflet/src/geotiff-layer-leaflet-vector-arrows';

// service inspired from https://github.com/haoliangyu/ngx-leaflet-starter/blob/master/src/app/map.service.ts
@Injectable({
  providedIn: 'root'
})
export class MapService {
  public baseMaps: any;
  public map: L.Map;

  // Layers control object with our two base layers and the three overlay layers
  layersControl = {
    baseLayers: { },
    overlays: { }
  };

  layers = [ ];

  // Set the initial set of displayed layers (we could also use the leafletLayers input binding for this)
  options = {
    layers: this.layers,
    zoom: 4,
    center: L.latLng([ 40, 5 ])
  };

  constructor() {
    const osmAttr =
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

    const topoAttr =
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

    const esriAttr =
      'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, ' +
      'iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, ' +
      'Esri China (Hong Kong), and the GIS User Community';

    const cartoAttr =
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> ' +
      '&copy; <a href="http://cartodb.com/attributions">CartoDB</a>';

    this.baseMaps = {
      OpenStreetMap: L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          detectRetina: true,
          zIndex: 1,
          attribution: osmAttr
        }
      ),

      TopoMaps: L.tileLayer(
        'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        {
          detectRetina: true,
          zIndex: 1,
          attribution: topoAttr
        }
      ),

      Esri: L.tileLayer(
        'http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
        {
          detectRetina: true,
          zIndex: 1,
          attribution: esriAttr
        }
      ),

      CartoDB: L.tileLayer(
        'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        {
          detectRetina: true,
          zIndex: 1,
          attribution: cartoAttr
        }
      )
    };

    // setting leaflet parameters with user defined values
    this.layersControl.baseLayers = this.baseMaps;
    this.layers = [ this.baseMaps.OpenStreetMap ];

  }

  public onMapReady(leafletMap: L.Map) {
    // get the received map
    this.map = leafletMap;

    // add coordinates to map
    L.control.coordinates({
      // enableUserInput: false, //optional default true
    }).addTo(this.map);

    // Hyperarid AI < 0.05 - 7.5% of the global land area
    // Arid 0.05 < AI < 0.20 - 12.1% of the global land area
    // Semi-arid 0.20 < AI < 0.50 - 17.7% of the global land area
    // Dry subhumid 0.50 < AI < 0.65 - 9.9% of the global land area
    plotty.addColorScale('aridity', ['#A80000', '#FF0000', '#FFAA00', '#FFFF00', '#D1FF73'], [0.01, 0.05, 0.20, 0.50, 0.65]);

    const aridity = new L.LeafletGeotiff(
      './assets/aridity.tif',
      {
        band: 0,
        name: 'FAO Aridity',
        opacity: 0.5,
        renderer: new L.LeafletGeotiff.Plotty({
          colorScale: 'aridity',
          // displayMin: 0.01,
          // displayMax: 7.8,
          clampLow: false,
          clampHigh: true,
        })
      }
    ); // .addTo(this.map);

    this.layersControl.overlays['FAO aridity'] = aridity;

    // This event is actually of type LeafletMouseEvent, which extends LeafletEvent.
    // So cast the event to gain access to the properties of LeafletMouseEvent
    // https://stackoverflow.com/a/48746870/4385116:
    this.map.on('click', <LeafletMouseEvent>(e) => {
      // console.log(e.latlng);
      console.log(`aridity value at ${e.latlng}: ` + aridity.getValueAtLatLng(e.latlng.lat, e.latlng.lng));
    });

    // TODO: remove this
    // backwards compatibility
    return this.map;
  }
}
