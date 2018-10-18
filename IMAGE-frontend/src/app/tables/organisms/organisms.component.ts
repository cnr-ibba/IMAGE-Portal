import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-organisms',
  templateUrl: './organisms.component.html',
  styleUrls: ['./organisms.component.css']
})
export class OrganismsComponent implements OnInit {
  displayedColumns = ['id', 'species', 'breed', 'sex'];
  dataSource = new MatTableDataSource<any>();

  constructor() { }

  ngOnInit() {
  }

}
