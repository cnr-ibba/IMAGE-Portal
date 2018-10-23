import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {TablesService} from '../tables.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-specimens',
  templateUrl: './specimens.component.html',
  styleUrls: ['./specimens.component.css']
})
export class SpecimensComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'species', 'derived', 'organism'];
  dataSource = new MatTableDataSource(this.tablesService.getSpecimens());
  activeFilters;
  activeFiltersSubscription: Subscription;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private tablesService: TablesService) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.activeFiltersSubscription = this.tablesService.filtersChanged.subscribe(data => {
      this.activeFilters = data;
    });
  }

  hasActiveFilters() {
    return this.tablesService.activeFilters.length !== 0;
  }

  ngOnDestroy() {
    this.activeFiltersSubscription.unsubscribe();
  }

}
