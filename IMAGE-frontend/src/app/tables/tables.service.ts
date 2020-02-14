import {Injectable} from '@angular/core';
import {Observable, Subject, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {HostSetting} from './host-setting';
import {catchError, map, retry} from 'rxjs/operators';

export interface CDPOrganismsApi {
  results: OrganismsApi[];
  count: number;
}

export interface OrganismsApi {
  id: string;
  species: string;
  breed: string;
  sex: string;
  efabisBreedCountry: string;
  birthLocationLongitude: string;
  birthLocationLatitude: string;
}

export interface CPDSpecimensApi {
  results: SpecimensApi[];
  count: number;
}

export interface SpecimensApi {
  id: string;
  species: string;
  derivedFrom: string;
  organismPart: string;
  collectionPlaceLatitude: string;
  collectionPlaceLongitude: string;
}


@Injectable({
  providedIn: 'root'
})
export class TablesService {

  activeFilters = {
    species: [],
    breed: [],
    sex: [],
    organism_part: [],
  };
  filtersChanged = new Subject();
  hostSetting = new HostSetting;
  organismSubject = new Subject();
  specimenSubject = new Subject();

  constructor(private http: HttpClient) {}

  getOrganisms(sortColumn, sortDirection, pageNumber, filterValue: {[key: string]: []}): Observable<CDPOrganismsApi> {
    pageNumber = +pageNumber + 1;
    if (sortColumn === 'supplied_breed' || sortColumn === 'sex') {
      sortColumn = `organisms__${sortColumn}`;
    }

    if (sortDirection === 'asc') {
      sortColumn = `-${sortColumn}`;
    }
    let url = this.hostSetting.host + `organism_short/?page=${pageNumber}&ordering=${sortColumn}`;
    if (filterValue) {
      for (let [key, values] of Object.entries(filterValue)) {
        if (key === 'sex') {
          key = `organisms__${key}`;
        }
        if (key === 'breed') {
          key = 'organisms__supplied_breed';
        }
        for (const value of values) {
          url = `${url}&${key}=${value}`;
        }
      }
    }
    return this.http.get<CDPOrganismsApi>(url);
  }

  getSpecimens(sortColumn, sortDirection, pageNumber, filterValue: {[key: string]: []}): Observable<CPDSpecimensApi> {
    pageNumber = +pageNumber + 1;
    if (sortColumn === 'derived_from' || sortColumn === 'organism_part') {
      sortColumn = `specimens__${sortColumn}`;
    }

    if (sortDirection === 'asc') {
      sortColumn = `-${sortColumn}`;
    }
    let url = this.hostSetting.host + `specimen_short/?page=${pageNumber}&ordering=${sortColumn}`;
    if (filterValue) {
      for (let [key, values] of Object.entries(filterValue)) {
        if (key === 'organism_part') {
          key = 'specimens__organism_part';
        }
        for (const value of values) {
          url = `${url}&${key}=${value}`;
        }
      }
    }
    return this.http.get<CPDSpecimensApi>(url);
  }

  getOrganismsSummary(filterValue?: {[key: string]: []}) {
    let url = 'https://www.image2020genebank.eu/data_portal/backend/organism/summary/';

    if (this.checkFiltersEmpty(filterValue) === false) {
      for (let [key, values] of Object.entries(filterValue)) {
        if (key === 'sex') {
          key = `organisms__${key}`;
        }
        if (key === 'breed') {
          key = 'organisms__supplied_breed';
        }
        for (const value of values) {
          if (url.indexOf('?') !== -1) {
            url = `${url}&${key}=${value}`;
          } else {
            url = `${url}?${key}=${value}`;
          }
        }
      }
    }
    return this.http.get(url);
  }


  getOrganismsGraphicalSummary() {
    return this.http.get('https://www.image2020genebank.eu/data_portal/backend/organism/graphical_summary/');
  }

  OrganismsGISSearch(latitude: string, longitude: string, radius: string) {
    const url = `https://www.image2020genebank.eu/data_portal/backend/organism/gis_search/?latitude=${latitude}&longitude=${longitude}&radius=${radius}`;
    return this.http.get(url);
  }

  getSpecimensSummary(filterValue?: {[key: string]: []}) {
    let url = 'https://www.image2020genebank.eu/data_portal/backend/specimen/summary/';

    if (this.checkFiltersEmpty(filterValue) === false) {
      for (let [key, values] of Object.entries(filterValue)) {
        if (key === 'organism_part') {
          key = 'specimens__organism_part';
        }
        for (const value of values) {
          if (url.indexOf('?') !== -1) {
            url = `${url}&${key}=${value}`;
          } else {
            url = `${url}?${key}=${value}`;
          }
        }
      }
    }
    return this.http.get(url);
  }

  getSpecimensGraphicalSummary() {
    return this.http.get('https://www.image2020genebank.eu/data_portal/backend/specimen/graphical_summary/');
  }

  SpecimensGISSearch(latitude: string, longitude: string, radius: string) {
    const url = `https://www.image2020genebank.eu/data_portal/backend/specimen/gis_search/?latitude=${latitude}&longitude=${longitude}&radius=${radius}`;
    return this.http.get(url);
  }

  checkFiltersEmpty(filterValue?: {[key: string]: []}) {
    if (Object.entries(filterValue).length === 0) {
      return true;
    } else {
      for (const item of Object.entries(filterValue)) {
        if (item[1].length !== 0) {
          return false;
        }
      }
      return true;
    }
  }

  getOrganism(organismId: string) {
    const url = this.hostSetting.host + 'organism/' + organismId;
    return this.http.get(url);
  }

  getSpecimen(specimenId: string) {
    const url = this.hostSetting.host + 'specimen/' + specimenId;
    return this.http.get(url);
  }

  searchOrganisms(query: string) {
    const url = `https://www.image2020genebank.eu/data_portal/backend/organism/?search=${query}`;
    return this.http.get(url);
  }

  searchSpecimens(query: string) {
    const url = `https://www.image2020genebank.eu/data_portal/backend/specimen/?search=${query}`;
    return this.http.get(url);
  }

  addRemoveActiveFilters(filterItem: string, title: string) {
    const key = this.convertTitleToKey(title);
    if (this.activeFilters[key].indexOf(filterItem) !== -1) {
      const index = this.activeFilters[key].indexOf(filterItem);
      this.activeFilters[key].splice(index, 1);
    } else {
      this.activeFilters[key].push(filterItem);
    }
    this.filtersChanged.next(this.activeFilters);
  }

  emptyActiveFilters() {
    for (const key of Object.keys(this.activeFilters)) {
      this.activeFilters[key] = [];
    }
    this.filtersChanged.next(this.activeFilters);
  }

  convertTitleToKey(title: string) {
    let key: string;
    switch (title) {
      case 'Species': {
        key = 'species';
        break;
      }
      case 'Supplied breed': {
        key = 'breed';
        break;
      }
      case 'Sex': {
        key = 'sex';
        break;
      }
      case 'Derived from': {
        key = 'derivedFrom';
        break;
      }
      case 'Organism part': {
        key = 'organism_part';
        break;
      }
      default: {
        key = title;
        break;
      }
    }
    return key;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network errorSubject occurred. Handle it accordingly.
      console.error('An errorSubject occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      console.error(error);
    }
    // return an observable with a user-facing errorSubject message
    return throwError(
      'Something bad happened; please try again later.');
  }

}
