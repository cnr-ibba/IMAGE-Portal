import {Injectable} from '@angular/core';
import {Subject, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {HostSetting} from './host-setting';
import {catchError, map, retry} from 'rxjs/operators';

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

export interface Specimens {
  id: string;
  alternativeId: string;
  project: string;
  submissionTitle: string;
  material: string;
  personLastName: string;
  personEmail: string;
  personAffiliation: string;
  personRole: string;
  organizationName: string;
  organizationRole: string;
  geneBankName: string;
  geneBankCountry: string;
  dataSourceType: string;
  dataSourceVersion: string;
  species: string;
  submissionDescription: string;
  personFirstName: string;
  organizationAddress: string;
  organizationCountry: string;
  description: string;
  personInitial: string;
  organizationUri: string;
  publicationDoi: string;
  derivedFrom: string;
  collectionDate: string;
  collectionPlace: string;
  collectionPlaceAccuracy: string;
  organismPart: string;
  specimenCollectionProtocol: string;
  collectionPlaceLatitude: string;
  collectionPlaceLongitude: string;
  developmentalStage: string;
  physiologicalStage: string;
  availabiity: string;
  sampleStorage: string;
  sampleStorageProcessing: string;
  animalAgeAtCollection: string;
  samplingToPreparationInterval: string;
  sample: string;
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
    derivedFrom: [],
    organismPart: [],
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
      retry(3),
      catchError(this.handleError)
    );
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
          personLastName: entry['person_last_name'],
          personEmail: entry['person_email'],
          personAffiliation: entry['person_affiliation'],
          personRole: entry['person_role'],
          organizationName: entry['organization_name'],
          organizationRole: entry['organization_role'],
          geneBankName: entry['gene_bank_name'],
          geneBankCountry: entry['gene_bank_country'],
          dataSourceType: entry['data_source_type'],
          dataSourceVersion: entry['data_source_version'],
          species: entry['species'],
          submissionDescription: entry['submission_description'],
          personFirstName: entry['person_first_name'],
          organizationAddress: entry['organization_address'],
          organizationCountry: entry['organization_country'],
          description: entry['description'],
          personInitial: entry['person_initial'],
          organizationUri: entry['organization_uri'],
          publicationDoi: entry['publication_doi'],
          derivedFrom: entry['specimens'][0]['derived_from'],
          collectionDate: entry['specimens'][0]['collection_date'],
          collectionPlace: entry['specimens'][0]['collection_place'],
          collectionPlaceAccuracy: entry['specimens'][0]['collection_place_accuracy'],
          organismPart: entry['specimens'][0]['organism_part'],
          specimenCollectionProtocol: entry['specimens'][0]['specimen_collection_protocol'],
          collectionPlaceLatitude: entry['specimens'][0]['collection_place_latitude'],
          collectionPlaceLongitude: entry['specimens'][0]['collection_place_longitude'],
          developmentalStage: entry['specimens'][0]['developmental_stage'],
          physiologicalStage: entry['specimens'][0]['physiological_stage'],
          availabiity: entry['specimens'][0]['availability'],
          sampleStorage: entry['specimens'][0]['sample_storage'],
          sampleStorageProcessing: entry['specimens'][0]['sample_storage_processing'],
          animalAgeAtCollection: entry['specimens'][0]['animal_age_at_collection'],
          samplingToPreparationInterval: entry['specimens'][0]['sampling_to_preparation_interval'],
          sample: entry['specimens'][0]['sample'],
          } as Specimens)
        );
      }),
      retry(3),
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
        key = 'organismPart';
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
