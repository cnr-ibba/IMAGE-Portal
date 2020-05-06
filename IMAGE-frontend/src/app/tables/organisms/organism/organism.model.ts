
export class DADisSpecie {
  common_name: string;
  scientific_name: string;
}

export class DADis {
  dadis_url: string;
  efabis_breed_country: string;
  species: DADisSpecie;
  supplied_breed: string;
  url: string;
}
