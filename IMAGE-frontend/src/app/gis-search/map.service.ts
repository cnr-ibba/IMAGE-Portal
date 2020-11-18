import { Injectable } from '@angular/core';

import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  public baseMaps: any;

  // service inspired from https://github.com/haoliangyu/ngx-leaflet-starter/blob/master/src/app/map.service.ts

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
  }
}
