import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {TablesService} from '../tables.service';
import {Subscription} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-specimens',
  templateUrl: './specimens.component.html',
  styleUrls: ['./specimens.component.css']
})
export class SpecimensComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'species', 'derivedFrom', 'organismPart'];
  headers = ['BioSample ID', 'Species', 'Species ontology', 'Derived from', 'Organism part', 'Organism part ontology'];
  activeFilters;
  activeFiltersSubscription: Subscription;
  dataSource: any;
  optionsCsv;
  exportData;
  error: any;

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private tablesService: TablesService,
              public snackBar: MatSnackBar,
              private titleService: Title,
              private router: Router,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.titleService.setTitle('IMAGE Specimens');
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const filters = {
        species: [],
        breed: [],
        sex: [],
        derivedFrom: [],
        organismPart: [],
      };
      for (const key in params) {
        if (Array.isArray(params[key])) {
          filters[key] = params[key];
        } else {
          filters[key] = [params[key]];
        }
      }
      this.activeFilters = Object.entries(filters);
      this.tablesService.activeFilters = filters;
      this.doFilter();
    });
    this.tablesService.getAllSpecimensShort('?page_size=100000').subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.exportData = this.dataSource.data;
        this.tablesService.generateSpecimenFilters(this.dataSource.data);
        this.setFilter();
        this.doFilter();
      },
      error => {
        this.error = error;
        this.snackBar.open(this.error, 'close', {
          duration: 5000,
        });
      }
    );
    this.optionsCsv = this.tablesService.optionsCsv;
    this.optionsCsv.headers = this.headers;
    this.activeFiltersSubscription = this.tablesService.filtersChanged.subscribe(data => {
      const params = {};
      for (const key of Object.keys(data)) {
        if (data[key] && data[key].length !== 0) {
          params[key] = data[key];
        }
      }
      this.router.navigate(['tables', 'specimen'], {queryParams: params});
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
    this.emptyActiveFilters();
    this.activeFiltersSubscription.unsubscribe();
  }

}
