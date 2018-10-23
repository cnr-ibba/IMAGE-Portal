import { Component, OnInit } from '@angular/core';
import {TablesService} from './tables.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  constructor(private tableService: TablesService) { }

  ngOnInit() {
  }

  onClick() {
    this.tableService.emptyActiveFilters();
  }

}
