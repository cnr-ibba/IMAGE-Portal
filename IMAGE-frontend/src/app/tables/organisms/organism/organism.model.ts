
export class DADisSpecie {
  common_name: string;
  scientific_name: string;
}

export class DADis {
  url: string;
  species: DADisSpecie;
  supplied_breed: string;
  country: string;
  most_common_name: string;
  transboundary_name: string;
  other_name: string[];
  dadis_url: string;
}
