import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.css']
})
export class ExperimentsComponent implements OnInit {
  displayedColumns = ['id', 'type', 'target'];
  dataSource = new MatTableDataSource<any>();

  constructor() { }

  ngOnInit() {
  }

}
