import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-breeders-interface',
  templateUrl: './breeders-interface.component.html',
  styleUrls: ['./breeders-interface.component.css']
})
export class BreedersInterfaceComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('IMAGE|Breeders Interface');
  }

}
