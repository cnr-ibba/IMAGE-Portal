import {AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort} from '@angular/material';
import {SpecimensApi, TablesService} from '../tables.service';
import {merge, of as observableOf, Subscription} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-specimens',
  templateUrl: './specimens.component.html',
  styleUrls: ['./specimens.component.css']
})
export class SpecimensComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns = ['data_source_id', 'species', 'derived_from', 'organism_part'];
  data: SpecimensApi[] = [];
  activeFilters = {};
  activeFiltersNames = [];
  filtersChange = new EventEmitter();
  aggregationsRequired = true;

  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private tablesService: TablesService,
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
          this.onRemoveActiveFilter(params[key], key);
        }
      }
      this.activeFilters = filters;
      this.activeFiltersNames = Object.entries(this.activeFilters);
      this.filtersChange.emit(null);
      this.aggregationsRequired = true;
    });
    this.tablesService.filtersChanged.subscribe(data => {
      const params = {};
      for (const key of Object.keys(data)) {
        if (data[key] && data[key].length !== 0) {
          params[key] = data[key];
        }
      }
      this.router.navigate(['tables', 'specimen'], {queryParams: params});
    });
  }

  getAggregations(filterData: any) {
    this.tablesService.getSpecimensSummary(filterData).subscribe(data => {
      this.tablesService.specimenSubject.next(data);
    });
  }

  ngAfterViewInit(): void {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page, this.filtersChange)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.tablesService.getSpecimens(
            this.sort.active, this.sort.direction, this.paginator.pageIndex, this.activeFilters);
        }),
        map(data => {
          this.isLoadingResults = false;
          this.resultsLength = data.count;

          return data.results;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe(data => {
      this.data = data;
      if (this.aggregationsRequired) {
        this.getAggregations(this.activeFilters);
        this.aggregationsRequired = false;
      }
    });
  }

  hasActiveFilters() {
    return this.tablesService.checkFiltersEmpty(this.activeFilters) === false;
  }

  emptyActiveFilters() {
    this.tablesService.emptyActiveFilters();
  }

  onRemoveActiveFilter(filterItem: string, title: string) {
    this.tablesService.addRemoveActiveFilters(filterItem, title);
  }

  ngOnDestroy(): void {
    this.emptyActiveFilters();
  }

}
