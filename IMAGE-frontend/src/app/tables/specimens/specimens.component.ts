import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
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
  optionsCsv;
  exportData;
  error: any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private tablesService: TablesService, public snackBar: MatSnackBar) {}

  ngOnInit() {
    this.tablesService.getAllSpecimens().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.exportData = this.dataSource.data;
        this.tablesService.generateSpecimenFilters(this.dataSource.data);
        this.setFilter();
      },
      error => {
        this.error = error;
        this.snackBar.open(this.error, 'close', {
          duration: 5000,
        });
      }
    );
    this.optionsCsv = this.tablesService.optionsCsv;
    this.optionsCsv.headers = this.displayedColumns;
    this.activeFiltersSubscription = this.tablesService.filtersChanged.subscribe(data => {
      this.activeFilters = Object.entries(data);
      this.doFilter();
    });
  }

  setFilter() {
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
                if (this.checkValueIn(data.derivedFrom, value) === true) {
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
    if (typeof this.dataSource !== 'undefined') {
      this.dataSource.filter = this.activeFilters;
      this.exportData = this.dataSource.filteredData;
      this.tablesService.generateSpecimenFilters(this.dataSource.filteredData);
    }
  }

  checkValueIn(field: any, value: string) {
    return field === value;
  }

  emptyActiveFilters() {
    this.tablesService.emptyActiveFilters();
  }

  hasErrors() {
    return typeof this.error !== 'undefined';
  }

  ngOnDestroy() {
    this.activeFiltersSubscription.unsubscribe();
  }

}
