import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {TablesService} from '../../tables.service';

@Component({
  selector: 'app-organism',
  templateUrl: './organism.component.html',
  styleUrls: ['./organism.component.css']
})
export class OrganismComponent implements OnInit {
  id: string;
  data;

  constructor(private route: ActivatedRoute, private tablesService: TablesService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.tablesService.getOrganism(this.id).subscribe(
      data => {
        this.data = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  checkExistence(key: string, organism = false) {
    if (organism) {
      return typeof this.data !== 'undefined' && this.data['organisms'][0][key] !== '';
    } else {
      return typeof this.data !== 'undefined' && this.data[key] !== '';
    }
  }

}
