import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {TablesService} from "../../tables.service";

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
    this.data = this.tablesService.getOrganism(this.id);
  }

}
