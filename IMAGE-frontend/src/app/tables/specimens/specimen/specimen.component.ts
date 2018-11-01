import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {TablesService} from '../../tables.service';
import {Title} from '@angular/platform-browser';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-specimen',
  templateUrl: './specimen.component.html',
  styleUrls: ['./specimen.component.css']
})
export class SpecimenComponent implements OnInit {
  id: string;
  data;
  error: any;

  constructor(private route: ActivatedRoute, private tablesService: TablesService,
              private titleService: Title, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.titleService.setTitle(`${this.id} | IMAGE specimen`);
    });
    this.tablesService.getSpecimen(this.id).subscribe(
      data => {
        this.data = data;
      },
      error => {
        this.error = error;
        this.snackBar.open(this.error, 'close', {
          duration: 5000,
        });
      }
      );
  }

  checkExistence(key: string, organism = false) {
    if (organism) {
      return typeof this.data !== 'undefined' && this.data['specimens'][0][key] !== '';
    } else {
      return typeof this.data !== 'undefined' && this.data[key] !== '';
    }
  }

  hasError() {
    return typeof this.error !== 'undefined';
  }

}
