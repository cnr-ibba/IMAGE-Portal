import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {TablesService} from '../tables.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-organisms',
  templateUrl: './organisms.component.html',
  styleUrls: ['./organisms.component.css']
})
export class OrganismsComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'species', 'breed', 'sex'];
  dataSource = new MatTableDataSource(this.tablesService.getOrganisms());
  activeFilters;
  activeFiltersSubscription: Subscription;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private tablesService: TablesService) {
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
                const field = data['characteristics']['Species'][0]['text'];
                if (this.checkValueIn(field, value) === true) {
                  willBeIn[0] = true;
                }
              }
            }
            break;
          }
          case 'breed': {
            if (item[1].length === 0) {
              willBeIn[1] = true;
            } else {
              for (const value of item[1]) {
                const field = data['characteristics']['Supplied breed'][0]['text'];
                if (this.checkValueIn(field, value) === true) {
                  willBeIn[1] = true;
                }
              }
            }
            break;
          }
          case 'sex': {
            if (item[1].length === 0) {
              willBeIn[2] = true;
            } else {
              for (const value of item[1]) {
                const field = data['characteristics']['Sex'][0]['text'];
                if (this.checkValueIn(field, value) === true) {
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

  ngOnDestroy() {
    this.activeFiltersSubscription.unsubscribe();
  }

}
