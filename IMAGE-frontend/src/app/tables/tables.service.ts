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
  breed: string;
  efabisBreedCountry: string;
  sex: string;
  birthLocationAccuracy: string;
  mappedBreed: string;
  birthLocation: string;
  birthLocationLongitude: string;
  birthLocationLatitude: string;
  childOf: string;
  sample: string;
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
  data = [{"name":"sample_363","accession":"SAMEA5159523","domain":"subs.test-team-1","release":"2018-10-09T00:00:00Z","update":"2018-10-17T10:54:47.691Z","taxId":0,"characteristics":{"Alternative id":[{"text":"2423"}],"Collection date":[{"text":"2011-09-20","unit":"YYYY-MM-DD"}],"Data source type":[{"text":"CryoWeb"}],"Derived from":[{"text":"ANIMAL:::ID:::VERIT012000024961_2010"}],"Gene bank country":[{"text":"Italy","ontologyTerms":["http://purl.obolibrary.org/obo/GAZ_00002650"]}],"Gene bank name":[{"text":"CryoWeb Subset"}],"Material":[{"text":"specimen from organism","ontologyTerms":["http://purl.obolibrary.org/obo/OBI_0001479"]}],"Organism part":[{"text":"Hair"}],"Organization name":[{"text":"IBBA-CNR"}],"Organization role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Person affiliation":[{"text":"IBBA-CNR"}],"Person last name":[{"text":"Cozzi"}],"Person role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Project":[{"text":"IMAGE"}],"Species":[{"text":"Capra hircus","ontologyTerms":["http://purl.obolibrary.org/obo/NCBITaxon_9925"]}],"Submission title":[{"text":"Italian Cryoweb Pigs"}]},"relationships":[{"source":"SAMEA5159523","type":"derived from","target":"SAMEA5159534"}],"releaseDate":"2018-10-09","updateDate":"2018-10-17","_links":{"self":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159523"},"curationDomain":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159523{?curationdomain}","templated":true},"curationLinks":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159523/curationlinks"},"curationLink":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159523/curationlinks/{hash}","templated":true}}},{"name":"sample_354","accession":"SAMEA5159524","domain":"subs.test-team-1","release":"2018-10-09T00:00:00Z","update":"2018-10-17T10:54:47.849Z","taxId":0,"characteristics":{"Alternative id":[{"text":"2341"}],"Collection date":[{"text":"2011-09-20","unit":"YYYY-MM-DD"}],"Data source type":[{"text":"CryoWeb"}],"Derived from":[{"text":"ANIMAL:::ID:::VERIT012000024961_2010"}],"Gene bank country":[{"text":"Italy","ontologyTerms":["http://purl.obolibrary.org/obo/GAZ_00002650"]}],"Gene bank name":[{"text":"CryoWeb Subset"}],"Material":[{"text":"specimen from organism","ontologyTerms":["http://purl.obolibrary.org/obo/OBI_0001479"]}],"Organism part":[{"text":"Semen"}],"Organization name":[{"text":"IBBA-CNR"}],"Organization role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Person affiliation":[{"text":"IBBA-CNR"}],"Person last name":[{"text":"Cozzi"}],"Person role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Project":[{"text":"IMAGE"}],"Species":[{"text":"Capra hircus","ontologyTerms":["http://purl.obolibrary.org/obo/NCBITaxon_9925"]}],"Submission title":[{"text":"Italian Cryoweb Pigs"}]},"relationships":[{"source":"SAMEA5159524","type":"derived from","target":"SAMEA5159534"}],"releaseDate":"2018-10-09","updateDate":"2018-10-17","_links":{"self":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159524"},"curationDomain":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159524{?curationdomain}","templated":true},"curationLinks":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159524/curationlinks"},"curationLink":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159524/curationlinks/{hash}","templated":true}}},{"name":"sample_343","accession":"SAMEA5159525","domain":"subs.test-team-1","release":"2018-10-09T00:00:00Z","update":"2018-10-17T10:54:47.753Z","taxId":0,"characteristics":{"Alternative id":[{"text":"1998"}],"Collection date":[{"text":"1999-05-26","unit":"YYYY-MM-DD"}],"Data source type":[{"text":"CryoWeb"}],"Derived from":[{"text":"ANIMAL:::ID:::CS05_1999"}],"Gene bank country":[{"text":"Italy","ontologyTerms":["http://purl.obolibrary.org/obo/GAZ_00002650"]}],"Gene bank name":[{"text":"CryoWeb Subset"}],"Material":[{"text":"specimen from organism","ontologyTerms":["http://purl.obolibrary.org/obo/OBI_0001479"]}],"Organism part":[{"text":"Semen"}],"Organization name":[{"text":"IBBA-CNR"}],"Organization role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Person affiliation":[{"text":"IBBA-CNR"}],"Person last name":[{"text":"Cozzi"}],"Person role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Project":[{"text":"IMAGE"}],"Species":[{"text":"Sus scrofa","ontologyTerms":["http://purl.obolibrary.org/obo/NCBITaxon_9823"]}],"Submission title":[{"text":"Italian Cryoweb Pigs"}]},"relationships":[{"source":"SAMEA5159525","type":"derived from","target":"SAMEA5159538"}],"releaseDate":"2018-10-09","updateDate":"2018-10-17","_links":{"self":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159525"},"curationDomain":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159525{?curationdomain}","templated":true},"curationLinks":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159525/curationlinks"},"curationLink":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159525/curationlinks/{hash}","templated":true}}},{"name":"animal_50","accession":"SAMEA5159526","domain":"subs.test-team-1","release":"2018-10-09T00:00:00Z","update":"2018-10-17T10:54:47.707Z","taxId":0,"characteristics":{"Alternative id":[{"text":"1443"}],"Data source ID":[{"text":"ANIMAL:::ID:::VERIT12000024025_2008"}],"Data source type":[{"text":"CryoWeb"}],"EFABIS Breed country":[{"text":"Italy","ontologyTerms":["http://purl.obolibrary.org/obo/GAZ_00002650"]}],"Gene bank country":[{"text":"Italy","ontologyTerms":["http://purl.obolibrary.org/obo/GAZ_00002650"]}],"Gene bank name":[{"text":"CryoWeb Subset"}],"Material":[{"text":"organism","ontologyTerms":["http://purl.obolibrary.org/obo/OBI_0100026"]}],"Organization name":[{"text":"IBBA-CNR"}],"Organization role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Person affiliation":[{"text":"IBBA-CNR"}],"Person last name":[{"text":"Cozzi"}],"Person role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Project":[{"text":"IMAGE"}],"Sex":[{"text":"male","ontologyTerms":["http://purl.obolibrary.org/obo/PATO_0000384"]}],"Species":[{"text":"Capra hircus","ontologyTerms":["http://purl.obolibrary.org/obo/NCBITaxon_9925"]}],"Submission title":[{"text":"Italian Cryoweb Pigs"}],"Supplied breed":[{"text":"Verzaschese"}],"title":[{"text":"ANIMAL:::ID:::VERIT12000024025_2008"}]},"relationships":[{"source":"SAMEA5159530","type":"derived from","target":"SAMEA5159526"},{"source":"SAMEA5159532","type":"derived from","target":"SAMEA5159526"},{"source":"SAMEA5159545","type":"derived from","target":"SAMEA5159526"}],"releaseDate":"2018-10-09","updateDate":"2018-10-17","_links":{"self":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159526"},"curationDomain":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159526{?curationdomain}","templated":true},"curationLinks":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159526/curationlinks"},"curationLink":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159526/curationlinks/{hash}","templated":true}}},{"name":"sample_258","accession":"SAMEA5159527","domain":"subs.test-team-1","release":"2018-10-09T00:00:00Z","update":"2018-10-17T10:54:47.935Z","taxId":0,"characteristics":{"Alternative id":[{"text":"1836"}],"Collection date":[{"text":"1999-10-19","unit":"YYYY-MM-DD"}],"Data source type":[{"text":"CryoWeb"}],"Derived from":[{"text":"ANIMAL:::ID:::CS05_1999"}],"Gene bank country":[{"text":"Italy","ontologyTerms":["http://purl.obolibrary.org/obo/GAZ_00002650"]}],"Gene bank name":[{"text":"CryoWeb Subset"}],"Material":[{"text":"specimen from organism","ontologyTerms":["http://purl.obolibrary.org/obo/OBI_0001479"]}],"Organism part":[{"text":"Semen"}],"Organization name":[{"text":"IBBA-CNR"}],"Organization role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Person affiliation":[{"text":"IBBA-CNR"}],"Person last name":[{"text":"Cozzi"}],"Person role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Project":[{"text":"IMAGE"}],"Species":[{"text":"Sus scrofa","ontologyTerms":["http://purl.obolibrary.org/obo/NCBITaxon_9823"]}],"Submission title":[{"text":"Italian Cryoweb Pigs"}]},"relationships":[{"source":"SAMEA5159527","type":"derived from","target":"SAMEA5159538"}],"releaseDate":"2018-10-09","updateDate":"2018-10-17","_links":{"self":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159527"},"curationDomain":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159527{?curationdomain}","templated":true},"curationLinks":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159527/curationlinks"},"curationLink":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159527/curationlinks/{hash}","templated":true}}},{"name":"sample_257","accession":"SAMEA5159528","domain":"subs.test-team-1","release":"2018-10-09T00:00:00Z","update":"2018-10-17T10:54:47.906Z","taxId":0,"characteristics":{"Alternative id":[{"text":"1835"}],"Collection date":[{"text":"1999-06-23","unit":"YYYY-MM-DD"}],"Data source type":[{"text":"CryoWeb"}],"Derived from":[{"text":"ANIMAL:::ID:::CS05_1999"}],"Gene bank country":[{"text":"Italy","ontologyTerms":["http://purl.obolibrary.org/obo/GAZ_00002650"]}],"Gene bank name":[{"text":"CryoWeb Subset"}],"Material":[{"text":"specimen from organism","ontologyTerms":["http://purl.obolibrary.org/obo/OBI_0001479"]}],"Organism part":[{"text":"Semen"}],"Organization name":[{"text":"IBBA-CNR"}],"Organization role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Person affiliation":[{"text":"IBBA-CNR"}],"Person last name":[{"text":"Cozzi"}],"Person role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Project":[{"text":"IMAGE"}],"Species":[{"text":"Sus scrofa","ontologyTerms":["http://purl.obolibrary.org/obo/NCBITaxon_9823"]}],"Submission title":[{"text":"Italian Cryoweb Pigs"}]},"relationships":[{"source":"SAMEA5159528","type":"derived from","target":"SAMEA5159538"}],"releaseDate":"2018-10-09","updateDate":"2018-10-17","_links":{"self":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159528"},"curationDomain":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159528{?curationdomain}","templated":true},"curationLinks":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159528/curationlinks"},"curationLink":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159528/curationlinks/{hash}","templated":true}}},{"name":"sample_344","accession":"SAMEA5159529","domain":"subs.test-team-1","release":"2018-10-09T00:00:00Z","update":"2018-10-17T10:54:47.953Z","taxId":0,"characteristics":{"Alternative id":[{"text":"1999"}],"Collection date":[{"text":"1999-06-17","unit":"YYYY-MM-DD"}],"Data source type":[{"text":"CryoWeb"}],"Derived from":[{"text":"ANIMAL:::ID:::CS05_1999"}],"Gene bank country":[{"text":"Italy","ontologyTerms":["http://purl.obolibrary.org/obo/GAZ_00002650"]}],"Gene bank name":[{"text":"CryoWeb Subset"}],"Material":[{"text":"specimen from organism","ontologyTerms":["http://purl.obolibrary.org/obo/OBI_0001479"]}],"Organism part":[{"text":"Semen"}],"Organization name":[{"text":"IBBA-CNR"}],"Organization role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Person affiliation":[{"text":"IBBA-CNR"}],"Person last name":[{"text":"Cozzi"}],"Person role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Project":[{"text":"IMAGE"}],"Species":[{"text":"Sus scrofa","ontologyTerms":["http://purl.obolibrary.org/obo/NCBITaxon_9823"]}],"Submission title":[{"text":"Italian Cryoweb Pigs"}]},"relationships":[{"source":"SAMEA5159529","type":"derived from","target":"SAMEA5159538"}],"releaseDate":"2018-10-09","updateDate":"2018-10-17","_links":{"self":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159529"},"curationDomain":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159529{?curationdomain}","templated":true},"curationLinks":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159529/curationlinks"},"curationLink":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159529/curationlinks/{hash}","templated":true}}},{"name":"sample_361","accession":"SAMEA5159530","domain":"subs.test-team-1","release":"2018-10-09T00:00:00Z","update":"2018-10-18T08:08:26.341Z","taxId":0,"characteristics":{"Alternative id":[{"text":"2421"}],"Collection date":[{"text":"2011-09-03","unit":"YYYY-MM-DD"}],"Data source type":[{"text":"CryoWeb"}],"Derived from":[{"text":"ANIMAL:::ID:::VERIT12000024025_2008"}],"Gene bank country":[{"text":"Italy","ontologyTerms":["http://purl.obolibrary.org/obo/GAZ_00002650"]}],"Gene bank name":[{"text":"CryoWeb Subset"}],"Material":[{"text":"specimen from organism","ontologyTerms":["http://purl.obolibrary.org/obo/OBI_0001479"]}],"Organism part":[{"text":"Blood","ontologyTerms":["http://purl.obolibrary.org/obo/UBERON_0000178"]}],"Organization name":[{"text":"IBBA-CNR"}],"Organization role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Person affiliation":[{"text":"IBBA-CNR"}],"Person last name":[{"text":"Cozzi"}],"Person role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Project":[{"text":"IMAGE"}],"Species":[{"text":"Capra hircus","ontologyTerms":["http://purl.obolibrary.org/obo/NCBITaxon_9925"]}],"Submission title":[{"text":"Italian Cryoweb Pigs"}]},"relationships":[{"source":"SAMEA5159530","type":"derived from","target":"SAMEA5159526"}],"releaseDate":"2018-10-09","updateDate":"2018-10-18","_links":{"self":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159530"},"curationDomain":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159530{?curationdomain}","templated":true},"curationLinks":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159530/curationlinks"},"curationLink":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159530/curationlinks/{hash}","templated":true}}},{"name":"sample_364","accession":"SAMEA5159531","domain":"subs.test-team-1","release":"2018-10-09T00:00:00Z","update":"2018-10-18T08:08:26.355Z","taxId":0,"characteristics":{"Alternative id":[{"text":"2424"}],"Collection date":[{"text":"2011-09-20","unit":"YYYY-MM-DD"}],"Data source type":[{"text":"CryoWeb"}],"Derived from":[{"text":"ANIMAL:::ID:::VERIT012000024961_2010"}],"Gene bank country":[{"text":"Italy","ontologyTerms":["http://purl.obolibrary.org/obo/GAZ_00002650"]}],"Gene bank name":[{"text":"CryoWeb Subset"}],"Material":[{"text":"specimen from organism","ontologyTerms":["http://purl.obolibrary.org/obo/OBI_0001479"]}],"Organism part":[{"text":"Blood","ontologyTerms":["http://purl.obolibrary.org/obo/UBERON_0000178"]}],"Organization name":[{"text":"IBBA-CNR"}],"Organization role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Person affiliation":[{"text":"IBBA-CNR"}],"Person last name":[{"text":"Cozzi"}],"Person role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Project":[{"text":"IMAGE"}],"Species":[{"text":"Capra hircus","ontologyTerms":["http://purl.obolibrary.org/obo/NCBITaxon_9925"]}],"Submission title":[{"text":"Italian Cryoweb Pigs"}]},"relationships":[{"source":"SAMEA5159531","type":"derived from","target":"SAMEA5159534"}],"releaseDate":"2018-10-09","updateDate":"2018-10-18","_links":{"self":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159531"},"curationDomain":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159531{?curationdomain}","templated":true},"curationLinks":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159531/curationlinks"},"curationLink":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159531/curationlinks/{hash}","templated":true}}},{"name":"sample_362","accession":"SAMEA5159532","domain":"subs.test-team-1","release":"2018-10-09T00:00:00Z","update":"2018-10-17T10:54:48.740Z","taxId":0,"characteristics":{"Alternative id":[{"text":"2422"}],"Collection date":[{"text":"2011-09-03","unit":"YYYY-MM-DD"}],"Data source type":[{"text":"CryoWeb"}],"Derived from":[{"text":"ANIMAL:::ID:::VERIT12000024025_2008"}],"Gene bank country":[{"text":"Italy","ontologyTerms":["http://purl.obolibrary.org/obo/GAZ_00002650"]}],"Gene bank name":[{"text":"CryoWeb Subset"}],"Material":[{"text":"specimen from organism","ontologyTerms":["http://purl.obolibrary.org/obo/OBI_0001479"]}],"Organism part":[{"text":"Hair"}],"Organization name":[{"text":"IBBA-CNR"}],"Organization role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Person affiliation":[{"text":"IBBA-CNR"}],"Person last name":[{"text":"Cozzi"}],"Person role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Project":[{"text":"IMAGE"}],"Species":[{"text":"Capra hircus","ontologyTerms":["http://purl.obolibrary.org/obo/NCBITaxon_9925"]}],"Submission title":[{"text":"Italian Cryoweb Pigs"}]},"relationships":[{"source":"SAMEA5159532","type":"derived from","target":"SAMEA5159526"}],"releaseDate":"2018-10-09","updateDate":"2018-10-17","_links":{"self":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159532"},"curationDomain":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159532{?curationdomain}","templated":true},"curationLinks":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159532/curationlinks"},"curationLink":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159532/curationlinks/{hash}","templated":true}}},{"name":"sample_256","accession":"SAMEA5159533","domain":"subs.test-team-1","release":"2018-10-09T00:00:00Z","update":"2018-10-17T10:54:48.843Z","taxId":0,"characteristics":{"Alternative id":[{"text":"1834"}],"Collection date":[{"text":"1999-06-02","unit":"YYYY-MM-DD"}],"Data source type":[{"text":"CryoWeb"}],"Derived from":[{"text":"ANIMAL:::ID:::CS05_1999"}],"Gene bank country":[{"text":"Italy","ontologyTerms":["http://purl.obolibrary.org/obo/GAZ_00002650"]}],"Gene bank name":[{"text":"CryoWeb Subset"}],"Material":[{"text":"specimen from organism","ontologyTerms":["http://purl.obolibrary.org/obo/OBI_0001479"]}],"Organism part":[{"text":"Semen"}],"Organization name":[{"text":"IBBA-CNR"}],"Organization role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Person affiliation":[{"text":"IBBA-CNR"}],"Person last name":[{"text":"Cozzi"}],"Person role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Project":[{"text":"IMAGE"}],"Species":[{"text":"Sus scrofa","ontologyTerms":["http://purl.obolibrary.org/obo/NCBITaxon_9823"]}],"Submission title":[{"text":"Italian Cryoweb Pigs"}]},"relationships":[{"source":"SAMEA5159533","type":"derived from","target":"SAMEA5159538"}],"releaseDate":"2018-10-09","updateDate":"2018-10-17","_links":{"self":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159533"},"curationDomain":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159533{?curationdomain}","templated":true},"curationLinks":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159533/curationlinks"},"curationLink":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159533/curationlinks/{hash}","templated":true}}},{"name":"animal_52","accession":"SAMEA5159534","domain":"subs.test-team-1","release":"2018-10-09T00:00:00Z","update":"2018-10-17T10:54:48.781Z","taxId":0,"characteristics":{"Alternative id":[{"text":"1452"}],"Data source ID":[{"text":"ANIMAL:::ID:::VERIT012000024961_2010"}],"Data source type":[{"text":"CryoWeb"}],"EFABIS Breed country":[{"text":"Italy","ontologyTerms":["http://purl.obolibrary.org/obo/GAZ_00002650"]}],"Gene bank country":[{"text":"Italy","ontologyTerms":["http://purl.obolibrary.org/obo/GAZ_00002650"]}],"Gene bank name":[{"text":"CryoWeb Subset"}],"Material":[{"text":"organism","ontologyTerms":["http://purl.obolibrary.org/obo/OBI_0100026"]}],"Organization name":[{"text":"IBBA-CNR"}],"Organization role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Person affiliation":[{"text":"IBBA-CNR"}],"Person last name":[{"text":"Cozzi"}],"Person role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Project":[{"text":"IMAGE"}],"Sex":[{"text":"male","ontologyTerms":["http://purl.obolibrary.org/obo/PATO_0000384"]}],"Species":[{"text":"Capra hircus","ontologyTerms":["http://purl.obolibrary.org/obo/NCBITaxon_9925"]}],"Submission title":[{"text":"Italian Cryoweb Pigs"}],"Supplied breed":[{"text":"Verzaschese"}],"title":[{"text":"ANIMAL:::ID:::VERIT012000024961_2010"}]},"relationships":[{"source":"SAMEA5159523","type":"derived from","target":"SAMEA5159534"},{"source":"SAMEA5159524","type":"derived from","target":"SAMEA5159534"},{"source":"SAMEA5159531","type":"derived from","target":"SAMEA5159534"}],"releaseDate":"2018-10-09","updateDate":"2018-10-17","_links":{"self":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159534"},"curationDomain":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159534{?curationdomain}","templated":true},"curationLinks":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159534/curationlinks"},"curationLink":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159534/curationlinks/{hash}","templated":true}}},{"name":"animal_42","accession":"SAMEA5159535","domain":"subs.test-team-1","release":"2018-10-09T00:00:00Z","update":"2018-10-17T10:54:48.643Z","taxId":0,"characteristics":{"Alternative id":[{"text":"862"}],"Data source ID":[{"text":"ANIMAL:::ID:::CS12_1999"}],"Data source type":[{"text":"CryoWeb"}],"EFABIS Breed country":[{"text":"Italy","ontologyTerms":["http://purl.obolibrary.org/obo/GAZ_00002650"]}],"Gene bank country":[{"text":"Italy","ontologyTerms":["http://purl.obolibrary.org/obo/GAZ_00002650"]}],"Gene bank name":[{"text":"CryoWeb Subset"}],"Material":[{"text":"organism","ontologyTerms":["http://purl.obolibrary.org/obo/OBI_0100026"]}],"Organization name":[{"text":"IBBA-CNR"}],"Organization role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Person affiliation":[{"text":"IBBA-CNR"}],"Person last name":[{"text":"Cozzi"}],"Person role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Project":[{"text":"IMAGE"}],"Sex":[{"text":"male","ontologyTerms":["http://purl.obolibrary.org/obo/PATO_0000384"]}],"Species":[{"text":"Sus scrofa","ontologyTerms":["http://purl.obolibrary.org/obo/NCBITaxon_9823"]}],"Submission title":[{"text":"Italian Cryoweb Pigs"}],"Supplied breed":[{"text":"Cinta Senese"}],"title":[{"text":"ANIMAL:::ID:::CS12_1999"}]},"relationships":[{"source":"SAMEA5159540","type":"derived from","target":"SAMEA5159535"},{"source":"SAMEA5159541","type":"derived from","target":"SAMEA5159535"},{"source":"SAMEA5159542","type":"derived from","target":"SAMEA5159535"},{"source":"SAMEA5159543","type":"derived from","target":"SAMEA5159535"},{"source":"SAMEA5159544","type":"derived from","target":"SAMEA5159535"}],"releaseDate":"2018-10-09","updateDate":"2018-10-17","_links":{"self":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159535"},"curationDomain":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159535{?curationdomain}","templated":true},"curationLinks":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159535/curationlinks"},"curationLink":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159535/curationlinks/{hash}","templated":true}}},{"name":"sample_359","accession":"SAMEA5159536","domain":"subs.test-team-1","release":"2018-10-09T00:00:00Z","update":"2018-10-17T10:54:48.893Z","taxId":0,"characteristics":{"Alternative id":[{"text":"2419"}],"Collection date":[{"text":"2011-09-03","unit":"YYYY-MM-DD"}],"Data source type":[{"text":"CryoWeb"}],"Derived from":[{"text":"ANIMAL:::ID:::VERCH1539971_2010"}],"Gene bank country":[{"text":"Italy","ontologyTerms":["http://purl.obolibrary.org/obo/GAZ_00002650"]}],"Gene bank name":[{"text":"CryoWeb Subset"}],"Material":[{"text":"specimen from organism","ontologyTerms":["http://purl.obolibrary.org/obo/OBI_0001479"]}],"Organism part":[{"text":"Hair"}],"Organization name":[{"text":"IBBA-CNR"}],"Organization role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Person affiliation":[{"text":"IBBA-CNR"}],"Person last name":[{"text":"Cozzi"}],"Person role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Project":[{"text":"IMAGE"}],"Species":[{"text":"Capra hircus","ontologyTerms":["http://purl.obolibrary.org/obo/NCBITaxon_9925"]}],"Submission title":[{"text":"Italian Cryoweb Pigs"}]},"relationships":[{"source":"SAMEA5159536","type":"derived from","target":"SAMEA5159537"}],"releaseDate":"2018-10-09","updateDate":"2018-10-17","_links":{"self":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159536"},"curationDomain":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159536{?curationdomain}","templated":true},"curationLinks":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159536/curationlinks"},"curationLink":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159536/curationlinks/{hash}","templated":true}}},{"name":"animal_51","accession":"SAMEA5159537","domain":"subs.test-team-1","release":"2018-10-09T00:00:00Z","update":"2018-10-17T10:54:48.677Z","taxId":0,"characteristics":{"Alternative id":[{"text":"1440"}],"Data source ID":[{"text":"ANIMAL:::ID:::VERCH1539971_2010"}],"Data source type":[{"text":"CryoWeb"}],"EFABIS Breed country":[{"text":"Italy","ontologyTerms":["http://purl.obolibrary.org/obo/GAZ_00002650"]}],"Gene bank country":[{"text":"Italy","ontologyTerms":["http://purl.obolibrary.org/obo/GAZ_00002650"]}],"Gene bank name":[{"text":"CryoWeb Subset"}],"Material":[{"text":"organism","ontologyTerms":["http://purl.obolibrary.org/obo/OBI_0100026"]}],"Organization name":[{"text":"IBBA-CNR"}],"Organization role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Person affiliation":[{"text":"IBBA-CNR"}],"Person last name":[{"text":"Cozzi"}],"Person role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Project":[{"text":"IMAGE"}],"Sex":[{"text":"male","ontologyTerms":["http://purl.obolibrary.org/obo/PATO_0000384"]}],"Species":[{"text":"Capra hircus","ontologyTerms":["http://purl.obolibrary.org/obo/NCBITaxon_9925"]}],"Submission title":[{"text":"Italian Cryoweb Pigs"}],"Supplied breed":[{"text":"Verzaschese"}],"title":[{"text":"ANIMAL:::ID:::VERCH1539971_2010"}]},"relationships":[{"source":"SAMEA5159536","type":"derived from","target":"SAMEA5159537"},{"source":"SAMEA5159546","type":"derived from","target":"SAMEA5159537"},{"source":"SAMEA5159547","type":"derived from","target":"SAMEA5159537"}],"releaseDate":"2018-10-09","updateDate":"2018-10-17","_links":{"self":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159537"},"curationDomain":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159537{?curationdomain}","templated":true},"curationLinks":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159537/curationlinks"},"curationLink":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159537/curationlinks/{hash}","templated":true}}},{"name":"animal_35","accession":"SAMEA5159538","domain":"subs.test-team-1","release":"2018-10-09T00:00:00Z","update":"2018-10-17T10:54:49.120Z","taxId":0,"characteristics":{"Alternative id":[{"text":"855"}],"Data source ID":[{"text":"ANIMAL:::ID:::CS05_1999"}],"Data source type":[{"text":"CryoWeb"}],"EFABIS Breed country":[{"text":"Italy","ontologyTerms":["http://purl.obolibrary.org/obo/GAZ_00002650"]}],"Gene bank country":[{"text":"Italy","ontologyTerms":["http://purl.obolibrary.org/obo/GAZ_00002650"]}],"Gene bank name":[{"text":"CryoWeb Subset"}],"Material":[{"text":"organism","ontologyTerms":["http://purl.obolibrary.org/obo/OBI_0100026"]}],"Organization name":[{"text":"IBBA-CNR"}],"Organization role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Person affiliation":[{"text":"IBBA-CNR"}],"Person last name":[{"text":"Cozzi"}],"Person role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Project":[{"text":"IMAGE"}],"Sex":[{"text":"male","ontologyTerms":["http://purl.obolibrary.org/obo/PATO_0000384"]}],"Species":[{"text":"Sus scrofa","ontologyTerms":["http://purl.obolibrary.org/obo/NCBITaxon_9823"]}],"Submission title":[{"text":"Italian Cryoweb Pigs"}],"Supplied breed":[{"text":"Cinta Senese"}],"title":[{"text":"ANIMAL:::ID:::CS05_1999"}]},"relationships":[{"source":"SAMEA5159525","type":"derived from","target":"SAMEA5159538"},{"source":"SAMEA5159527","type":"derived from","target":"SAMEA5159538"},{"source":"SAMEA5159528","type":"derived from","target":"SAMEA5159538"},{"source":"SAMEA5159529","type":"derived from","target":"SAMEA5159538"},{"source":"SAMEA5159533","type":"derived from","target":"SAMEA5159538"},{"source":"SAMEA5159539","type":"derived from","target":"SAMEA5159538"}],"releaseDate":"2018-10-09","updateDate":"2018-10-17","_links":{"self":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159538"},"curationDomain":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159538{?curationdomain}","templated":true},"curationLinks":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159538/curationlinks"},"curationLink":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159538/curationlinks/{hash}","templated":true}}},{"name":"sample_345","accession":"SAMEA5159539","domain":"subs.test-team-1","release":"2018-10-09T00:00:00Z","update":"2018-10-17T10:54:49.453Z","taxId":0,"characteristics":{"Alternative id":[{"text":"2000"}],"Collection date":[{"text":"1999-06-30","unit":"YYYY-MM-DD"}],"Data source type":[{"text":"CryoWeb"}],"Derived from":[{"text":"ANIMAL:::ID:::CS05_1999"}],"Gene bank country":[{"text":"Italy","ontologyTerms":["http://purl.obolibrary.org/obo/GAZ_00002650"]}],"Gene bank name":[{"text":"CryoWeb Subset"}],"Material":[{"text":"specimen from organism","ontologyTerms":["http://purl.obolibrary.org/obo/OBI_0001479"]}],"Organism part":[{"text":"Semen"}],"Organization name":[{"text":"IBBA-CNR"}],"Organization role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Person affiliation":[{"text":"IBBA-CNR"}],"Person last name":[{"text":"Cozzi"}],"Person role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Project":[{"text":"IMAGE"}],"Species":[{"text":"Sus scrofa","ontologyTerms":["http://purl.obolibrary.org/obo/NCBITaxon_9823"]}],"Submission title":[{"text":"Italian Cryoweb Pigs"}]},"relationships":[{"source":"SAMEA5159539","type":"derived from","target":"SAMEA5159538"}],"releaseDate":"2018-10-09","updateDate":"2018-10-17","_links":{"self":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159539"},"curationDomain":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159539{?curationdomain}","templated":true},"curationLinks":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159539/curationlinks"},"curationLink":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159539/curationlinks/{hash}","templated":true}}},{"name":"sample_213","accession":"SAMEA5159540","domain":"subs.test-team-1","release":"2018-10-09T00:00:00Z","update":"2018-10-17T10:54:49.495Z","taxId":0,"characteristics":{"Alternative id":[{"text":"1813"}],"Collection date":[{"text":"2000-12-18","unit":"YYYY-MM-DD"}],"Data source type":[{"text":"CryoWeb"}],"Derived from":[{"text":"ANIMAL:::ID:::CS12_1999"}],"Gene bank country":[{"text":"Italy","ontologyTerms":["http://purl.obolibrary.org/obo/GAZ_00002650"]}],"Gene bank name":[{"text":"CryoWeb Subset"}],"Material":[{"text":"specimen from organism","ontologyTerms":["http://purl.obolibrary.org/obo/OBI_0001479"]}],"Organism part":[{"text":"Semen"}],"Organization name":[{"text":"IBBA-CNR"}],"Organization role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Person affiliation":[{"text":"IBBA-CNR"}],"Person last name":[{"text":"Cozzi"}],"Person role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Project":[{"text":"IMAGE"}],"Species":[{"text":"Sus scrofa","ontologyTerms":["http://purl.obolibrary.org/obo/NCBITaxon_9823"]}],"Submission title":[{"text":"Italian Cryoweb Pigs"}]},"relationships":[{"source":"SAMEA5159540","type":"derived from","target":"SAMEA5159535"}],"releaseDate":"2018-10-09","updateDate":"2018-10-17","_links":{"self":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159540"},"curationDomain":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159540{?curationdomain}","templated":true},"curationLinks":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159540/curationlinks"},"curationLink":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159540/curationlinks/{hash}","templated":true}}},{"name":"sample_321","accession":"SAMEA5159541","domain":"subs.test-team-1","release":"2018-10-09T00:00:00Z","update":"2018-10-17T10:54:44.752Z","taxId":0,"characteristics":{"Alternative id":[{"text":"1980"}],"Collection date":[{"text":"2000-12-11","unit":"YYYY-MM-DD"}],"Data source type":[{"text":"CryoWeb"}],"Derived from":[{"text":"ANIMAL:::ID:::CS12_1999"}],"Gene bank country":[{"text":"Italy","ontologyTerms":["http://purl.obolibrary.org/obo/GAZ_00002650"]}],"Gene bank name":[{"text":"CryoWeb Subset"}],"Material":[{"text":"specimen from organism","ontologyTerms":["http://purl.obolibrary.org/obo/OBI_0001479"]}],"Organism part":[{"text":"Semen"}],"Organization name":[{"text":"IBBA-CNR"}],"Organization role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Person affiliation":[{"text":"IBBA-CNR"}],"Person last name":[{"text":"Cozzi"}],"Person role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Project":[{"text":"IMAGE"}],"Species":[{"text":"Sus scrofa","ontologyTerms":["http://purl.obolibrary.org/obo/NCBITaxon_9823"]}],"Submission title":[{"text":"Italian Cryoweb Pigs"}]},"relationships":[{"source":"SAMEA5159541","type":"derived from","target":"SAMEA5159535"}],"releaseDate":"2018-10-09","updateDate":"2018-10-17","_links":{"self":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159541"},"curationDomain":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159541{?curationdomain}","templated":true},"curationLinks":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159541/curationlinks"},"curationLink":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159541/curationlinks/{hash}","templated":true}}},{"name":"sample_220","accession":"SAMEA5159542","domain":"subs.test-team-1","release":"2018-10-09T00:00:00Z","update":"2018-10-17T10:54:49.462Z","taxId":0,"characteristics":{"Alternative id":[{"text":"1816"}],"Collection date":[{"text":"2001-01-08","unit":"YYYY-MM-DD"}],"Data source type":[{"text":"CryoWeb"}],"Derived from":[{"text":"ANIMAL:::ID:::CS12_1999"}],"Gene bank country":[{"text":"Italy","ontologyTerms":["http://purl.obolibrary.org/obo/GAZ_00002650"]}],"Gene bank name":[{"text":"CryoWeb Subset"}],"Material":[{"text":"specimen from organism","ontologyTerms":["http://purl.obolibrary.org/obo/OBI_0001479"]}],"Organism part":[{"text":"Semen"}],"Organization name":[{"text":"IBBA-CNR"}],"Organization role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Person affiliation":[{"text":"IBBA-CNR"}],"Person last name":[{"text":"Cozzi"}],"Person role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Project":[{"text":"IMAGE"}],"Species":[{"text":"Sus scrofa","ontologyTerms":["http://purl.obolibrary.org/obo/NCBITaxon_9823"]}],"Submission title":[{"text":"Italian Cryoweb Pigs"}]},"relationships":[{"source":"SAMEA5159542","type":"derived from","target":"SAMEA5159535"}],"releaseDate":"2018-10-09","updateDate":"2018-10-17","_links":{"self":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159542"},"curationDomain":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159542{?curationdomain}","templated":true},"curationLinks":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159542/curationlinks"},"curationLink":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159542/curationlinks/{hash}","templated":true}}},{"name":"sample_313","accession":"SAMEA5159543","domain":"subs.test-team-1","release":"2018-10-09T00:00:00Z","update":"2018-10-17T10:54:49.464Z","taxId":0,"characteristics":{"Alternative id":[{"text":"1979"}],"Collection date":[{"text":"2000-12-04","unit":"YYYY-MM-DD"}],"Data source type":[{"text":"CryoWeb"}],"Derived from":[{"text":"ANIMAL:::ID:::CS12_1999"}],"Gene bank country":[{"text":"Italy","ontologyTerms":["http://purl.obolibrary.org/obo/GAZ_00002650"]}],"Gene bank name":[{"text":"CryoWeb Subset"}],"Material":[{"text":"specimen from organism","ontologyTerms":["http://purl.obolibrary.org/obo/OBI_0001479"]}],"Organism part":[{"text":"Semen"}],"Organization name":[{"text":"IBBA-CNR"}],"Organization role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Person affiliation":[{"text":"IBBA-CNR"}],"Person last name":[{"text":"Cozzi"}],"Person role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Project":[{"text":"IMAGE"}],"Species":[{"text":"Sus scrofa","ontologyTerms":["http://purl.obolibrary.org/obo/NCBITaxon_9823"]}],"Submission title":[{"text":"Italian Cryoweb Pigs"}]},"relationships":[{"source":"SAMEA5159543","type":"derived from","target":"SAMEA5159535"}],"releaseDate":"2018-10-09","updateDate":"2018-10-17","_links":{"self":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159543"},"curationDomain":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159543{?curationdomain}","templated":true},"curationLinks":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159543/curationlinks"},"curationLink":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159543/curationlinks/{hash}","templated":true}}},{"name":"sample_320","accession":"SAMEA5159544","domain":"subs.test-team-1","release":"2018-10-09T00:00:00Z","update":"2018-10-17T10:54:49.653Z","taxId":0,"characteristics":{"Alternative id":[{"text":"1978"}],"Collection date":[{"text":"2000-11-15","unit":"YYYY-MM-DD"}],"Data source type":[{"text":"CryoWeb"}],"Derived from":[{"text":"ANIMAL:::ID:::CS12_1999"}],"Gene bank country":[{"text":"Italy","ontologyTerms":["http://purl.obolibrary.org/obo/GAZ_00002650"]}],"Gene bank name":[{"text":"CryoWeb Subset"}],"Material":[{"text":"specimen from organism","ontologyTerms":["http://purl.obolibrary.org/obo/OBI_0001479"]}],"Organism part":[{"text":"Semen"}],"Organization name":[{"text":"IBBA-CNR"}],"Organization role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Person affiliation":[{"text":"IBBA-CNR"}],"Person last name":[{"text":"Cozzi"}],"Person role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Project":[{"text":"IMAGE"}],"Species":[{"text":"Sus scrofa","ontologyTerms":["http://purl.obolibrary.org/obo/NCBITaxon_9823"]}],"Submission title":[{"text":"Italian Cryoweb Pigs"}]},"relationships":[{"source":"SAMEA5159544","type":"derived from","target":"SAMEA5159535"}],"releaseDate":"2018-10-09","updateDate":"2018-10-17","_links":{"self":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159544"},"curationDomain":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159544{?curationdomain}","templated":true},"curationLinks":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159544/curationlinks"},"curationLink":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159544/curationlinks/{hash}","templated":true}}},{"name":"sample_355","accession":"SAMEA5159545","domain":"subs.test-team-1","release":"2018-10-09T00:00:00Z","update":"2018-10-17T10:54:49.676Z","taxId":0,"characteristics":{"Alternative id":[{"text":"2305"}],"Collection date":[{"text":"2011-09-03","unit":"YYYY-MM-DD"}],"Data source type":[{"text":"CryoWeb"}],"Derived from":[{"text":"ANIMAL:::ID:::VERIT12000024025_2008"}],"Gene bank country":[{"text":"Italy","ontologyTerms":["http://purl.obolibrary.org/obo/GAZ_00002650"]}],"Gene bank name":[{"text":"CryoWeb Subset"}],"Material":[{"text":"specimen from organism","ontologyTerms":["http://purl.obolibrary.org/obo/OBI_0001479"]}],"Organism part":[{"text":"Semen"}],"Organization name":[{"text":"IBBA-CNR"}],"Organization role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Person affiliation":[{"text":"IBBA-CNR"}],"Person last name":[{"text":"Cozzi"}],"Person role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Project":[{"text":"IMAGE"}],"Species":[{"text":"Capra hircus","ontologyTerms":["http://purl.obolibrary.org/obo/NCBITaxon_9925"]}],"Submission title":[{"text":"Italian Cryoweb Pigs"}]},"relationships":[{"source":"SAMEA5159545","type":"derived from","target":"SAMEA5159526"}],"releaseDate":"2018-10-09","updateDate":"2018-10-17","_links":{"self":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159545"},"curationDomain":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159545{?curationdomain}","templated":true},"curationLinks":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159545/curationlinks"},"curationLink":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159545/curationlinks/{hash}","templated":true}}},{"name":"sample_356","accession":"SAMEA5159546","domain":"subs.test-team-1","release":"2018-10-09T00:00:00Z","update":"2018-10-17T10:54:49.811Z","taxId":0,"characteristics":{"Alternative id":[{"text":"2302"}],"Collection date":[{"text":"2011-09-03","unit":"YYYY-MM-DD"}],"Data source type":[{"text":"CryoWeb"}],"Derived from":[{"text":"ANIMAL:::ID:::VERCH1539971_2010"}],"Gene bank country":[{"text":"Italy","ontologyTerms":["http://purl.obolibrary.org/obo/GAZ_00002650"]}],"Gene bank name":[{"text":"CryoWeb Subset"}],"Material":[{"text":"specimen from organism","ontologyTerms":["http://purl.obolibrary.org/obo/OBI_0001479"]}],"Organism part":[{"text":"Semen"}],"Organization name":[{"text":"IBBA-CNR"}],"Organization role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Person affiliation":[{"text":"IBBA-CNR"}],"Person last name":[{"text":"Cozzi"}],"Person role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Project":[{"text":"IMAGE"}],"Species":[{"text":"Capra hircus","ontologyTerms":["http://purl.obolibrary.org/obo/NCBITaxon_9925"]}],"Submission title":[{"text":"Italian Cryoweb Pigs"}]},"relationships":[{"source":"SAMEA5159546","type":"derived from","target":"SAMEA5159537"}],"releaseDate":"2018-10-09","updateDate":"2018-10-17","_links":{"self":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159546"},"curationDomain":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159546{?curationdomain}","templated":true},"curationLinks":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159546/curationlinks"},"curationLink":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159546/curationlinks/{hash}","templated":true}}},{"name":"sample_360","accession":"SAMEA5159547","domain":"subs.test-team-1","release":"2018-10-09T00:00:00Z","update":"2018-10-18T08:08:26.349Z","taxId":0,"characteristics":{"Alternative id":[{"text":"2420"}],"Collection date":[{"text":"2011-09-03","unit":"YYYY-MM-DD"}],"Data source type":[{"text":"CryoWeb"}],"Derived from":[{"text":"ANIMAL:::ID:::VERCH1539971_2010"}],"Gene bank country":[{"text":"Italy","ontologyTerms":["http://purl.obolibrary.org/obo/GAZ_00002650"]}],"Gene bank name":[{"text":"CryoWeb Subset"}],"Material":[{"text":"specimen from organism","ontologyTerms":["http://purl.obolibrary.org/obo/OBI_0001479"]}],"Organism part":[{"text":"Blood","ontologyTerms":["http://purl.obolibrary.org/obo/UBERON_0000178"]}],"Organization name":[{"text":"IBBA-CNR"}],"Organization role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Person affiliation":[{"text":"IBBA-CNR"}],"Person last name":[{"text":"Cozzi"}],"Person role":[{"text":"submitter","ontologyTerms":["http://purl.obolibrary.org/obo/EFO_0001741"]}],"Project":[{"text":"IMAGE"}],"Species":[{"text":"Capra hircus","ontologyTerms":["http://purl.obolibrary.org/obo/NCBITaxon_9925"]}],"Submission title":[{"text":"Italian Cryoweb Pigs"}]},"relationships":[{"source":"SAMEA5159547","type":"derived from","target":"SAMEA5159537"}],"releaseDate":"2018-10-09","updateDate":"2018-10-18","_links":{"self":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159547"},"curationDomain":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159547{?curationdomain}","templated":true},"curationLinks":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159547/curationlinks"},"curationLink":{"href":"https://wwwdev.ebi.ac.uk/biosamples/samples/SAMEA5159547/curationlinks/{hash}","templated":true}}}];
  organismsData = [
    {id: 'SAMEA5159526', species: 'Capra hircus', breed: 'Verzaschese', sex: 'male'},
    {id: 'SAMEA5159534', species: 'Capra hircus', breed: 'Verzaschese', sex: 'male'},
    {id: 'SAMEA5159535', species: 'Sus scrofa', breed: 'Cinta Senese', sex: 'male'},
    {id: 'SAMEA5159537', species: 'Capra hircus', breed: 'Verzaschese', sex: 'male'},
    {id: 'SAMEA5159538', species: 'Sus scrofa', breed: 'Cinta Senese', sex: 'male'},
  ];
  specimensData = [
    {id: 'SAMEA5159536', species: 'Capra hircus', derived: 'ANIMAL:::ID:::VERCH1539971_2010', organismPart: 'Hair'},
    {id: 'SAMEA5159523', species: 'Capra hircus', derived: 'ANIMAL:::ID:::VERIT012000024961_2010', organismPart: 'Hair'},
    {id: 'SAMEA5159525', species: 'Sus scrofa', derived: 'ANIMAL:::ID:::CS05_1999', organismPart: 'Semen'},
    {id: 'SAMEA5159527', species: 'Sus scrofa', derived: 'ANIMAL:::ID:::CS05_1999', organismPart: 'Semen'},
    {id: 'SAMEA5159528', species: 'Sus scrofa', derived: 'ANIMAL:::ID:::CS05_1999', organismPart: 'Semen'},
    {id: 'SAMEA5159529', species: 'Sus scrofa', derived: 'ANIMAL:::ID:::CS05_1999', organismPart: 'Semen'},
    {id: 'SAMEA5159530', species: 'Capra hircus', derived: 'ANIMAL:::ID:::VERIT12000024025_2008', organismPart: 'Blood'},
    {id: 'SAMEA5159531', species: 'Capra hircus', derived: 'ANIMAL:::ID:::VERIT012000024961_2010', organismPart: 'Blood'},
    {id: 'SAMEA5159532', species: 'Capra hircus', derived: 'ANIMAL:::ID:::VERIT12000024025_2008', organismPart: 'Hair'},
    {id: 'SAMEA5159533', species: 'Sus scrofa', derived: 'ANIMAL:::ID:::CS05_1999', organismPart: 'Semen'},
    {id: 'SAMEA5159524', species: 'Capra hircus', derived: 'ANIMAL:::ID:::VERIT012000024961_2010', organismPart: 'Semen'},
    {id: 'SAMEA5159539', species: 'Sus scrofa', derived: 'ANIMAL:::ID:::CS05_1999', organismPart: 'Semen'},
    {id: 'SAMEA5159540', species: 'Sus scrofa', derived: 'ANIMAL:::ID:::CS05_1999', organismPart: 'Semen'},
    {id: 'SAMEA5159541', species: 'Sus scrofa', derived: 'ANIMAL:::ID:::CS05_1999', organismPart: 'Semen'},
    {id: 'SAMEA5159542', species: 'Sus scrofa', derived: 'ANIMAL:::ID:::CS05_1999', organismPart: 'Semen'},
    {id: 'SAMEA5159543', species: 'Sus scrofa', derived: 'ANIMAL:::ID:::CS12_1999', organismPart: 'Semen'},
    {id: 'SAMEA5159544', species: 'Sus scrofa', derived: 'ANIMAL:::ID:::CS12_1999', organismPart: 'Semen'},
    {id: 'SAMEA5159545', species: 'Capra hircus', derived: 'ANIMAL:::ID:::VERIT12000024025_2008', organismPart: 'Semen'},
    {id: 'SAMEA5159546', species: 'Capra hircus', derived: 'ANIMAL:::ID:::VERCH1539971_2010', organismPart: 'Semen'},
    {id: 'SAMEA5159547', species: 'Capra hircus', derived: 'ANIMAL:::ID:::VERCH1539971_2010', organismPart: 'Blood'},
  ];

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
          breed: entry['organisms'][0]['supplied_breed'],
          efabisBreedCountry: entry['organisms'][0]['efabis_breed_country'],
          sex: entry['organisms'][0]['sex'],
          birthLocationAccuracy: entry['organisms'][0]['birth_location_accuracy'],
          mappedBreed: entry['organisms'][0]['mapped_breed'],
          birthLocation: entry['organisms'][0]['birth_location'],
          birthLocationLongitude: entry['organisms'][0]['birth_location_longitude'],
          birthLocationLatitude: entry['organisms'][0]['birth_location_latitude'],
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

  getOrganisms() {
    const organisms = [];
    for (const item of this.data) {
      if (item['characteristics']['Material'][0]['text'] === 'organism') {
        organisms.push(item);
      }
    }
    return organisms;
  }

  getSpecimens() {
    const specimens = [];
    for (const item of this.data) {
      if (item['characteristics']['Material'][0]['text'] === 'specimen from organism') {
        specimens.push(item);
      }
    }
    return specimens;
  }

  getOrganism(organismId: string) {
    for (const item of this.data) {
      if (item['accession'] === organismId) {
        return item;
      }
    }
  }

  getSpecimen(specimenId: string) {
    for (const item of this.data) {
      if (item['accession'] === specimenId) {
        return item;
      }
    }
  }

  getOrganismFilter(filterId: string) {
    const organisms = this.getOrganisms();
    const results = {};
    for (const organism of organisms) {
      const key = organism['characteristics'][filterId][0]['text'];
      results.hasOwnProperty(key) ? results[key] += 1 : results[key] = 1;
    }
    return results;
  }

  getSpecimenFilter(filterId: string) {
    const specimens = this.getSpecimens();
    const results = {};
    for (const specimen of specimens) {
      const key = specimen['characteristics'][filterId][0]['text'];
      results.hasOwnProperty(key) ? results[key] += 1 : results[key] = 1;
    }
    return results;
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
