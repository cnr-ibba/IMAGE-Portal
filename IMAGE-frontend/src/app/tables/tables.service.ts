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

export interface Organisms {
  id: string;
  alternativeId: string;
  project: string;
  submissionTitle: string;
  material: string;
  materialOntology: string;
  personLastName: string;
  personEmail: string;
  personAffiliation: string;
  personRole: string;
  personRoleOntology: string;
  organizationName: string;
  organizationRole: string;
  organizationRoleOntology: string;
  geneBankName: string;
  geneBankCountry: string;
  geneBankCountryOntology: string;
  dataSourceType: string;
  dataSourceVersion: string;
  species: string;
  speciesOntology: string;
  etag: string;
  submissionDescription: string;
  personFirstName: string;
  organizationAddress: string;
  organizationCountry: string;
  organizationCountryOntology: string;
  description: string;
  personInitial: string;
  organizationUri: string;
  publicationDoi: string;
  breed: string;
  efabisBreedCountry: string;
  sex: string;
  sexOntology: string;
  birthLocationAccuracy: string;
  mappedBreed: string;
  mappedBreedOntology: string;
  birthDate: string;
  birthDateUnit: string;
  birthLocation: string;
  birthLocationLongitude: string;
  birthLocationLongitudeUnit: string;
  birthLocationLatitude: string;
  birthLocationLatitudeUnit: string;
  childOf: string;
}

export interface OrganismsShort {
  id: string;
  species: string;
  breed: string;
  sex: string;
  efabisBreedCountry: string;
  birthLocationLongitude: string;
  birthLocationLatitude: string;
}

export interface Specimens {
  id: string;
  alternativeId: string;
  project: string;
  submissionTitle: string;
  material: string;
  materialOntology: string;
  personLastName: string;
  personEmail: string;
  personAffiliation: string;
  personRole: string;
  personRoleOntology: string;
  organizationName: string;
  organizationRole: string;
  organizationRoleOntology: string;
  geneBankName: string;
  geneBankCountry: string;
  geneBankCountryOntology: string;
  dataSourceType: string;
  dataSourceVersion: string;
  species: string;
  speciesOntology: string;
  etag: string;
  submissionDescription: string;
  personFirstName: string;
  organizationAddress: string;
  organizationCountry: string;
  organizationCountryOntology: string;
  description: string;
  personInitial: string;
  organizationUri: string;
  publicationDoi: string;
  derivedFrom: string;
  collectionPlaceAccuracy: string;
  organismPart: string;
  organismPartOntology: string;
  specimenCollectionProtocol: string;
  collectionDate: string;
  collectionDateUnit: string;
  collectionPlaceLatitude: string;
  collectionPlaceLatitudeUnit: string;
  collectionPlaceLongitude: string;
  collectionPlaceLongitudeUnit: string;
  collectionPlace: string;
  developmentalStage: string;
  developmentalStageOntology: string;
  physiologicalStage: string;
  physiologicalStageOntology: string;
  availabiity: string;
  sampleStorage: string;
  sampleStorageProcessing: string;
  animalAgeAtCollection: string;
  animalAgeAtCollectionUnit: string;
  samplingToPreparationInterval: string;
  samplingToPreparationIntervalUnit: string;
}

export interface SpecimensShort {
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
  optionsCsv = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: false,
    headers: [],
    useBom: false,
    removeNewLines: true,
  };

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

  getAllOrganisms() {
    const url = this.hostSetting.host + 'organism/';
    return this.http.get(url).pipe(
      map((data: any) => {
        return data.map(entry => ({
          id: entry['data_source_id'],
          alternativeId: entry['alternative_id'],
          project: entry['project'],
          submissionTitle: entry['submission_title'],
          material: entry['material'],
          materialOntology: entry['material_ontology'],
          personLastName: entry['person_last_name'],
          personEmail: entry['person_email'],
          personAffiliation: entry['person_affiliation'],
          personRole: entry['person_role'],
          personRoleOntology: entry['person_role_ontology'],
          organizationName: entry['organization_name'],
          organizationRole: entry['organization_role'],
          organizationRoleOntology: entry['organization_role_ontology'],
          geneBankName: entry['gene_bank_name'],
          geneBankCountry: entry['gene_bank_country'],
          geneBankCountryOntology: entry['gene_bank_country_ontology'],
          dataSourceType: entry['data_source_type'],
          dataSourceVersion: entry['data_source_version'],
          species: entry['species'],
          speciesOntology: entry['species_ontology'],
          etag: entry['etag'],
          submissionDescription: entry['submission_description'],
          personFirstName: entry['person_first_name'],
          organizationAddress: entry['organization_address'],
          organizationCountry: entry['organization_country'],
          organizationCountryOntology: entry['organization_country_ontology'],
          description: entry['description'],
          personInitial: entry['person_initial'],
          organizationUri: entry['organization_uri'],
          publicationDoi: entry['publication_doi'],
          breed: entry['organisms'][0]['supplied_breed'],
          efabisBreedCountry: entry['organisms'][0]['efabis_breed_country'],
          sex: entry['organisms'][0]['sex'],
          sexOntology: entry['organisms'][0]['sex_ontology'],
          birthLocationAccuracy: entry['organisms'][0]['birth_location_accuracy'],
          mappedBreed: entry['organisms'][0]['mapped_breed'],
          mappedBreedOntology: entry['organisms'][0]['mapped_breed_ontology'],
          birthDate: entry['organisms'][0]['birth_date'],
          birthDateUnit: entry['organisms'][0]['birth_date_unit'],
          birthLocation: entry['organisms'][0]['birth_location'],
          birthLocationLongitude: entry['organisms'][0]['birth_location_longitude'],
          birthLocationLongitudeUnit: entry['organisms'][0]['birth_location_longitude_unit'],
          birthLocationLatitude: entry['organisms'][0]['birth_location_latitude'],
          birthLocationLatitudeUnit: entry['organisms'][0]['birth_location_latitude_unit'],
          childOf: entry['organisms'][0]['child_of'],
          sample: entry['organisms'][0]['sample']
        } as Organisms)
        );
      }),
      retry(0),
      catchError(this.handleError)
    );
  }

  getAllOrganismsShort(query) {
    const url = this.hostSetting.host + 'organism_short/' + query;
    return this.http.get(url).pipe(
      map((data: any) => {
        return data['results'].map(entry => ({
          id: entry['data_source_id'],
          species: entry['species'],
          breed: entry['organisms'][0]['supplied_breed'],
          sex: entry['organisms'][0]['sex'],
          efabisBreedCountry: entry['organisms'][0]['efabis_breed_country'],
          birthLocationLongitude: entry['organisms'][0]['birth_location_longitude'],
          birthLocationLatitude: entry['organisms'][0]['birth_location_latitude'],
          } as OrganismsShort)
        );
      }),
      retry(0),
      catchError(this.handleError)
    );
  }

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

  getAllSpecimens() {
    const url = this.hostSetting.host + 'specimen/';
    return this.http.get(url).pipe(
      map((data: any) => {
        return data.map(entry => ({
          id: entry['data_source_id'],
          alternativeId: entry['alternative_id'],
          project: entry['project'],
          submissionTitle: entry['submission_title'],
          material: entry['material'],
          materialOntology: entry['material_ontology'],
          personLastName: entry['person_last_name'],
          personEmail: entry['person_email'],
          personAffiliation: entry['person_affiliation'],
          personRole: entry['person_role'],
          personRoleOntology: entry['person_role_ontology'],
          organizationName: entry['organization_name'],
          organizationRole: entry['organization_role'],
          geneBankName: entry['gene_bank_name'],
          geneBankCountry: entry['gene_bank_country'],
          geneBankCountryOntology: entry['gene_bank_country_ontology'],
          dataSourceType: entry['data_source_type'],
          dataSourceVersion: entry['data_source_version'],
          species: entry['species'],
          speciesOntology: entry['species_ontology'],
          etag: entry['etag'],
          submissionDescription: entry['submission_description'],
          personFirstName: entry['person_first_name'],
          organizationAddress: entry['organization_address'],
          organizationCountry: entry['organization_country'],
          organizationCountryOntology: entry['organization_country_ontology'],
          description: entry['description'],
          personInitial: entry['person_initial'],
          organizationUri: entry['organization_uri'],
          publicationDoi: entry['publication_doi'],
          derivedFrom: entry['specimens'][0]['derived_from'],
          collectionPlaceAccuracy: entry['specimens'][0]['collection_place_accuracy'],
          organismPart: entry['specimens'][0]['organism_part'],
          organismPartOntology: entry['specimens'][0]['organism_part_ontology'],
          specimenCollectionProtocol: entry['specimens'][0]['specimen_collection_protocol'],
          collectionDate: entry['specimens'][0]['collection_date'],
          collectionDateUnit: entry['specimens'][0]['collection_date_unit'],
          collectionPlaceLatitude: entry['specimens'][0]['collection_place_latitude'],
          collectionPlaceLatitudeUnit: entry['specimens'][0]['collection_place_latitude_unit'],
          collectionPlaceLongitude: entry['specimens'][0]['collection_place_longitude'],
          collectionPlaceLongitudeUnit: entry['specimens'][0]['collection_place_longitude_unit'],
          collectionPlace: entry['specimens'][0]['collection_place'],
          developmentalStage: entry['specimens'][0]['developmental_stage'],
          developmentalStageOntology: entry['specimens'][0]['developmental_stage_ontology'],
          physiologicalStage: entry['specimens'][0]['physiological_stage'],
          physiologicalStageOntology: entry['specimens'][0]['physiological_stage_ontology'],
          availabiity: entry['specimens'][0]['availability'],
          sampleStorage: entry['specimens'][0]['sample_storage'],
          sampleStorageProcessing: entry['specimens'][0]['sample_storage_processing'],
          animalAgeAtCollection: entry['specimens'][0]['animal_age_at_collection'],
          animalAgeAtCollectionUnit: entry['specimens'][0]['animal_age_at_collection_unit'],
          samplingToPreparationInterval: entry['specimens'][0]['sampling_to_preparation_interval'],
          samplingToPreparationIntervalUnit: entry['specimens'][0]['sampling_to_preparation_interval_unit']
          } as Specimens)
        );
      }),
      retry(0),
      catchError(this.handleError)
    );
  }

  getAllSpecimensShort(query) {
    const url = this.hostSetting.host + 'specimen_short/' + query;
    return this.http.get(url).pipe(
      map((data: any) => {
        return data['results'].map(entry => ({
          id: entry['data_source_id'],
          species: entry['species'],
          derivedFrom: entry['specimens'][0]['derived_from'],
          organismPart: entry['specimens'][0]['organism_part'],
          collectionPlaceLatitude: entry['specimens'][0]['collection_place_latitude'],
          collectionPlaceLongitude: entry['specimens'][0]['collection_place_longitude']
          } as SpecimensShort)
        );
      }),
      retry(0),
      catchError(this.handleError)
    );
  }

  getOrganism(organismId: string) {
    const url = this.hostSetting.host + 'organism/' + organismId;
    return this.http.get(url);
  }

  getSpecimen(specimenId: string) {
    const url = this.hostSetting.host + 'specimen/' + specimenId;
    return this.http.get(url);
  }

  generateOrganismFilters(organisms: Organisms[]) {
    const species = {};
    const breed = {};
    const sex = {};
    for (const organism of organisms) {
      species.hasOwnProperty(organism['species']) ? species[organism['species']] += 1 : species[organism['species']] = 1;
      breed.hasOwnProperty(organism['breed']) ? breed[organism['breed']] += 1 : breed[organism['breed']] = 1;
      sex.hasOwnProperty(organism['sex']) ? sex[organism['sex']] += 1 : sex[organism['sex']] = 1;
    }
    const results = {
      species: species,
      breed: breed,
      sex: sex
    };
    this.organismSubject.next(results);
  }

  searchOrganisms(query: string) {
    const url = `https://www.image2020genebank.eu/data_portal/backend/organism/?search=${query}`;
    return this.http.get(url);
  }

  searchSpecimens(query: string) {
    const url = `https://www.image2020genebank.eu/data_portal/backend/specimen/?search=${query}`;
    return this.http.get(url);
  }

  generateSpecimenFilters(specimens: Specimens[]) {
    const species = {};
    const derivedFrom = {};
    const organismPart = {};
    for (const specimen of specimens) {
      species.hasOwnProperty(specimen['species']) ? species[specimen['species']] += 1 : species[specimen['species']] = 1;
      derivedFrom.hasOwnProperty(specimen['derivedFrom']) ? derivedFrom[specimen['derivedFrom']] += 1 :
        derivedFrom[specimen['derivedFrom']] = 1;
      organismPart.hasOwnProperty(specimen['organismPart']) ? organismPart[specimen['organismPart']] += 1 :
        organismPart[specimen['organismPart']] = 1;
    }
    const results = {
      species: species,
      derivedFrom: derivedFrom,
      organismPart: organismPart
    };
    this.specimenSubject.next(results);
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
