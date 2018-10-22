import {Component, Input, OnInit} from '@angular/core';
import {TablesService} from '../tables.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  @Input() title: string;
  @Input() tab: string;
  filters;

  constructor(private tableService: TablesService) { }

  ngOnInit() {
    if (this.tab === 'organism') {
      this.filters = this.tableService.getOrganismFilter(this.title);
    } else {
      this.filters = this.tableService.getSpecimenFilter(this.title);
    }
    this.filters = Object.entries(this.filters);
  }

}