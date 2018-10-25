import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {TablesService} from '../tables/tables.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  showResults = false;
  dataSourceOrganism: any;
  dataSourceSpecimen: any;
  displayedColumnsOrganisms = ['id', 'species', 'breed', 'sex'];
  displayedColumnsSpecimens = ['id', 'species', 'derived', 'organism'];

  constructor(private tablesService: TablesService) {
    this.dataSourceOrganism = new MatTableDataSource(this.tablesService.organismsData);
    this.dataSourceSpecimen = new MatTableDataSource(this.tablesService.specimensData);
  }

  ngOnInit() {
  }

  applyFilter(filterValue: string) {
    if (filterValue === '') {
      this.showResults = false;
    } else {
      this.showResults = true;
      this.dataSourceSpecimen.filter = filterValue.trim().toLowerCase();
      this.dataSourceOrganism.filter = filterValue.trim().toLowerCase();
    }
  }

}
