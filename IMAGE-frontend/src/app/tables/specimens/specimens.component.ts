import {AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort} from '@angular/material';
import {SpecimensApi, TablesService} from '../tables.service';
import {merge, of as observableOf, Subscription} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {saveAs} from 'file-saver';

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
  activatedRouteSubscription: Subscription;
  filtersChangedSubscription: Subscription;
  downloadLink: string;
  downloadText = 'Download data';

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
    this.activatedRouteSubscription = this.activatedRoute.queryParams.subscribe((params: Params) => {
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
      this.constructDownloadLink(this.activeFilters);
      this.activeFiltersNames = Object.entries(this.activeFilters);
      this.filtersChange.emit(null);
      this.aggregationsRequired = true;
    });
    this.filtersChangedSubscription = this.tablesService.filtersChanged.subscribe(data => {
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
    this.tablesService.getSpecimensSummary(filterData).subscribe(
      data => {
        this.tablesService.specimenSubject.next(data);
      },
      error => {
        console.log(error.message);
      }
    );
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

  constructDownloadLink(filterValue?: {[key: string]: []}) {
    this.downloadLink = this.tablesService.hostSetting.getHost() + 'specimen/download/';

    if (this.tablesService.checkFiltersEmpty(filterValue) === false) {
      for (const [key, values] of Object.entries(filterValue)) {
        for (const value of values) {
          if (this.downloadLink.indexOf('?') !== -1) {
            this.downloadLink = `${this.downloadLink}&${key}=${value}`;
          } else {
            this.downloadLink = `${this.downloadLink}?${key}=${value}`;
          }
        }
      }
    }
  }

  downloadData() {
    this.downloadText = 'Preparing data...';
    this.tablesService.export(this.downloadLink).subscribe(data => {
      this.downloadText = 'Download data';
      saveAs(data, 'specimens.txt');
    });
  }

  disableButton() {
    return this.downloadText === 'Preparing data...';
  }

  ngOnDestroy(): void {
    this.activatedRouteSubscription.unsubscribe();
    this.filtersChangedSubscription.unsubscribe();
    this.emptyActiveFilters();
  }

}
