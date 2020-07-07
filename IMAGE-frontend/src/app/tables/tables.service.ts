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

export interface CDPSpecimensApi {
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

export interface CPDFilesApi {
  results: FilesApi[];
  count: number;
}

export interface FilesApi {
  data_source_id: string;
  file_name: string;
  file_url: string;
  file_size: string;
  file_checksum: string;
  file_checksum_method: string;
  file_index_name: string;
  file_index_url: string;
  file_index_size: string;
  file_index_checksum: string;
  file_index_checksum_method: string;
}


@Injectable({
  providedIn: 'root'
})
export class TablesService {

  activeFilters = {
    species: [],
    country: [],
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

    if (sortDirection === 'asc') {
      sortColumn = `-${sortColumn}`;
    }
    let url = this.hostSetting.host + `organism_short/?page=${pageNumber}&ordering=${sortColumn}`;
    if (filterValue) {
      for (let [key, values] of Object.entries(filterValue)) {
        if (key === 'breed') {
          key = 'supplied_breed';
        }
        if (key === 'country') {
          // use the same name of the API
          key = 'efabis_breed_country';
        }
        for (const value of values) {
          url = `${url}&${key}=${value}`;
        }
      }
    }
    return this.http.get<CDPOrganismsApi>(url);
  }

  getSpecimens(sortColumn, sortDirection, pageNumber, filterValue: {[key: string]: []}): Observable<CDPSpecimensApi> {
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
    return this.http.get<CDPSpecimensApi>(url);
  }

  getFiles(sortColumn, sortDirection, pageNumber) {
    pageNumber = +pageNumber + 1;

    if (sortDirection === 'asc') {
      sortColumn = `-${sortColumn}`;
    }
    const url = this.hostSetting.host + `file/?page=${pageNumber}&ordering=${sortColumn}`;
    return this.http.get<CPDFilesApi>(url);
  }

  getOrganismsSummary(filterValue?: {[key: string]: []}) {
    let url = this.hostSetting.host + 'organism/summary/';

    if (this.checkFiltersEmpty(filterValue) === false) {
      for (let [key, values] of Object.entries(filterValue)) {
        if (key === 'breed') {
          key = 'supplied_breed';
        }
        if (key === 'country') {
          // use the same name of the API
          key = 'efabis_breed_country';
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
    return this.http.get(this.hostSetting.host + 'organism/graphical_summary/');
  }

  OrganismsGISSearch(latitude: string, longitude: string, radius: string) {
    const url = `${this.hostSetting.host}organism/gis_search/?latitude=${latitude}&longitude=${longitude}&radius=${radius}`;
    return this.http.get(url);
  }

  getSpecimensSummary(filterValue?: {[key: string]: []}) {
    let url = this.hostSetting.host + 'specimen/summary/';

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
    return this.http.get(this.hostSetting.host + 'specimen/graphical_summary/');
  }

  SpecimensGISSearch(latitude: string, longitude: string, radius: string) {
    const url = `${this.hostSetting.host}specimen/gis_search/?latitude=${latitude}&longitude=${longitude}&radius=${radius}`;
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

  getFile(specimenId: string) {
    const url = this.hostSetting.host + 'file/' + specimenId;
    return this.http.get(url);
  }

  searchOrganisms(query: string) {
    const url = `${this.hostSetting.host}organism/?search=${query}`;
    return this.http.get(url);
  }

  searchSpecimens(query: string) {
    const url = `${this.hostSetting.host}specimen/?search=${query}`;
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

  export(url: string) {
    return this.http.get(url, {responseType: 'blob'});
  }

  convertTitleToKey(title: string) {
    let key: string;
    switch (title) {
      case 'Species': {
        key = 'species';
        break;
      }
      case 'Countries': {
        // the key is the key used in the API
        key = 'country';
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
