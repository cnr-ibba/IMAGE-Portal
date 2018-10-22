import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {TablesService} from "../../tables.service";

@Component({
  selector: 'app-specimen',
  templateUrl: './specimen.component.html',
  styleUrls: ['./specimen.component.css']
})
export class SpecimenComponent implements OnInit {
  id: string;
  data;

  constructor(private route: ActivatedRoute, private tablesService: TablesService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.data = this.tablesService.getSpecimen(this.id);
  }

}
