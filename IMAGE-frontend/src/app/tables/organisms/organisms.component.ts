import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {TablesService} from '../tables.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-organisms',
  templateUrl: './organisms.component.html',
  styleUrls: ['./organisms.component.css']
})
export class OrganismsComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['id', 'species', 'breed', 'sex'];
  dataSource = new MatTableDataSource(this.tablesService.getOrganisms());
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

  ngAfterViewInit() {
  }

  hasActiveFilters() {
    return this.tablesService.activeFilters.length !== 0;
  }

  ngOnDestroy() {
    this.activeFiltersSubscription.unsubscribe();
  }

}
