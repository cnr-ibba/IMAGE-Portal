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
  activeFilters;
  activeFilterSubscription: Subscription;

  constructor(private tableService: TablesService) { }

  ngOnInit() {
    if (this.tab === 'organism') {
      this.filters = this.tableService.getOrganismFilter(this.title);
    } else {
      this.filters = this.tableService.getSpecimenFilter(this.title);
    }
    this.filters = Object.entries(this.filters);
    this.activeFilterSubscription = this.tableService.filtersChanged.subscribe(data => {
      this.activeFilters = data;
    });
  }

  onClick(filterItem: string, title: string) {
    this.tableService.addRemoveActiveFilters(filterItem, title);
  }

  isSelected(filterItem: string, title: string) {
    const key = this.tableService.convertTitleToKey(title);
    if (typeof this.activeFilters === 'undefined') {
      return false;
    } else {
      return this.activeFilters[key].indexOf(filterItem) !== -1;
    }
  }

  ngOnDestroy() {
    this.activeFilterSubscription.unsubscribe();
  }

}
