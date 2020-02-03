import {Component, OnInit} from '@angular/core';
import {TablesService} from '../tables/tables.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchTerm: string;
  organismsSearchResults: any;
  organismsFound = 0;
  showResults = false;
  searchStarted = false;
  specimensSearchResults: any;
  specimensFound = 0;
  displayedColumnsOrganisms = ['data_source_id', 'species', 'supplied_breed', 'sex'];
  displayedColumnsSpecimens = ['data_source_id', 'species', 'derived_from', 'organism_part'];

  constructor(private tablesService: TablesService, private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle('IMAGE|Search');
  }

  applyFilter(filterValue: string) {
    this.searchTerm = filterValue;
  }

  startSearch() {
    this.showResults = false;
    this.searchStarted = true;
    this.tablesService.searchOrganisms(this.searchTerm).subscribe(data => {
      this.organismsSearchResults = data['results'];
      this.organismsFound = data['count'];
      this.showResults = true;
    });
    this.tablesService.searchSpecimens(this.searchTerm).subscribe(data => {
      this.specimensSearchResults = data['results'];
      this.specimensFound = data['count'];
    });
  }

  hitEnter(event: any) {
    if (event['key'] === 'Enter') {
      this.showResults = false;
      this.searchStarted = true;
      this.searchTerm = event['target']['value'];
      this.startSearch();
    }
  }

}
