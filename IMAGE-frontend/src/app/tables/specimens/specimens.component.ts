import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {TablesService} from '../tables.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-specimens',
  templateUrl: './specimens.component.html',
  styleUrls: ['./specimens.component.css']
})
export class SpecimensComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'species', 'derived', 'organism'];
  activeFilters;
  activeFiltersSubscription: Subscription;
  dataSource: any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private tablesService: TablesService) {
    this.dataSource = new MatTableDataSource(this.tablesService.specimensData);
    this.dataSource.filterPredicate = (data, filter) => {
      if (!this.hasActiveFilters()) {
        return true;
      }
      const willBeIn = [false, false, false];
      for (const item of filter) {
        switch (item[0]) {
          case 'species': {
            if (item[1].length === 0) {
              willBeIn[0] = true;
            } else {
              for (const value of item[1]) {
                if (this.checkValueIn(data.species, value) === true) {
                  willBeIn[0] = true;
                }
              }
            }
            break;
          }
          case 'derivedFrom': {
            if (item[1].length === 0) {
              willBeIn[1] = true;
            } else {
              for (const value of item[1]) {
                if (this.checkValueIn(data.derived, value) === true) {
                  willBeIn[1] = true;
                }
              }
            }
            break;
          }
          case 'organismPart': {
            if (item[1].length === 0) {
              willBeIn[2] = true;
            } else {
              for (const value of item[1]) {
                if (this.checkValueIn(data.organismPart, value) === true) {
                  willBeIn[2] = true;
                }
              }
            }
            break;
          }
        }
      }
      return willBeIn[0] === true && willBeIn[1] === true && willBeIn[2] === true;
    };
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.activeFiltersSubscription = this.tablesService.filtersChanged.subscribe(data => {
      this.activeFilters = Object.entries(data);
      this.doFilter();
    });
  }

  hasActiveFilters() {
    if (typeof this.activeFilters === 'undefined') {
      return false;
    }
    for (const item of this.activeFilters) {
      if (item[1].length !== 0) {
        return true;
      }
    }
    return false;
  }

  onRemoveActiveFilter(filterItem: string, title: string) {
    this.tablesService.addRemoveActiveFilters(filterItem, title);
  }

  doFilter() {
    this.dataSource.filter = this.activeFilters;
  }

  checkValueIn(field: any, value: string) {
    return field === value;
  }

  emptyActiveFilters() {
    this.tablesService.emptyActiveFilters();
  }

  ngOnDestroy() {
    this.activeFiltersSubscription.unsubscribe();
  }

}
