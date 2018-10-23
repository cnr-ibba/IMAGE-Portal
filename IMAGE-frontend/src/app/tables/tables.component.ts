import { Component, OnInit } from '@angular/core';
import {TablesService} from './tables.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  constructor(private tablesService: TablesService) { }

  ngOnInit() {
  }

  onClick($event: any) {
    if ($event.srcElement.textContent === 'Organisms' ||
      $event.srcElement.textContent === 'Specimens' ||
      $event.srcElement.textContent === 'Experiments') {
      this.emptyActiveFilters();
    }
  }

  emptyActiveFilters() {
    this.tablesService.emptyActiveFilters();
  }

}
