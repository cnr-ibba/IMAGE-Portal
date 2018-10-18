import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-specimens',
  templateUrl: './specimens.component.html',
  styleUrls: ['./specimens.component.css']
})
export class SpecimensComponent implements OnInit {
  displayedColumns = ['id', 'species', 'derived', 'organism'];
  dataSource = new MatTableDataSource<any>();

  constructor() { }

  ngOnInit() {
  }

}
