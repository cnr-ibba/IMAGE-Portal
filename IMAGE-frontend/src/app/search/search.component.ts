import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {TablesService} from '../tables/tables.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  showResults = false;
  dataSourceOrganism: any;
  dataSourceSpecimen: any;
  organismsUploaded = false;
  specimensUploaded = false;
  error: any;
  displayedColumnsOrganisms = ['id', 'species', 'breed', 'sex'];
  displayedColumnsSpecimens = ['id', 'species', 'derived', 'organism'];

  constructor(private tablesService: TablesService, private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle('IMAGE|Search');
    this.tablesService.getAllOrganismsShort('?page_size=100000').subscribe(
      data => {
        this.dataSourceOrganism = new MatTableDataSource(data);
        if (this.dataSourceOrganism) {
          this.organismsUploaded = true;
        }
      },
      error => {
        this.error = error;
      }
    );
    this.tablesService.getAllSpecimensShort('?page_size=100000').subscribe(
      data => {
        this.dataSourceSpecimen = new MatTableDataSource(data);
        if (this.dataSourceSpecimen) {
          this.specimensUploaded = true;
        }
      },
      error => {
        this.error = error;
      }
    );
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
