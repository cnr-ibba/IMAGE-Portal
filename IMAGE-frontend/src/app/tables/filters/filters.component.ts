import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TablesService} from '../tables.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Input() title: string;
  @Input() tab: string;
  filters;
  filtersSubsctiption: Subscription;
  activeFilters;
  activeFilterSubscription: Subscription;

  constructor(private tableService: TablesService) { }

  ngOnInit() {
    if (this.tab === 'organism') {
      this.filtersSubsctiption = this.tableService.organismSubject.subscribe(data => {
        const key = this.tableService.convertTitleToKey(this.title);
        this.filters = Object.entries(data[key]).sort(function(a: any, b: any) {
          return b[1] - a[1];
        });
      });
    } else {
      this.filtersSubsctiption = this.tableService.specimenSubject.subscribe(data => {
        const key = this.tableService.convertTitleToKey(this.title);
        this.filters = Object.entries(data[key]).sort(function(a: any, b: any) {
          return b[1] - a[1];
        });
      });
    }
  }

  onClick(filterItem: string, title: string) {
    this.tableService.addRemoveActiveFilters(filterItem, title);
  }

  isSelected(filterItem: string, title: string) {
    const key = this.tableService.convertTitleToKey(title);
    return this.tableService.activeFilters[key].indexOf(filterItem) !== -1;
  }

  ngOnDestroy() {
    if (typeof this.filtersSubsctiption !== 'undefined') {
      this.filtersSubsctiption.unsubscribe();
    }
  }

}
