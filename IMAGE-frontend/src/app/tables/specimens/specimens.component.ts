import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {TablesService} from "../tables.service";

@Component({
  selector: 'app-specimens',
  templateUrl: './specimens.component.html',
  styleUrls: ['./specimens.component.css']
})
export class SpecimensComponent implements OnInit {
  displayedColumns = ['id', 'species', 'derived', 'organism'];
  dataSource = new MatTableDataSource(this.tablesService.getSpecimens());
  activeFilters: string[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private tablesService: TablesService) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.activeFilters = this.tablesService.activeFilters;
  }

  hasActiveFilters() {
    return this.tablesService.activeFilters.length !== 0;
  }

}
