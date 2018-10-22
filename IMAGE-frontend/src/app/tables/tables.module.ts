import {NgModule} from '@angular/core';
import {TablesComponent} from './tables.component';
import {TablesRoutingModule} from './tables-routing.module';
import {MaterialModule} from '../material.module';
import { OrganismsComponent } from './organisms/organisms.component';
import { SpecimensComponent } from './specimens/specimens.component';
import { ExperimentsComponent } from './experiments/experiments.component';
import { OrganismComponent } from './organisms/organism/organism.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    TablesComponent,
    OrganismsComponent,
    SpecimensComponent,
    ExperimentsComponent,
    OrganismComponent
  ],
  imports: [
    TablesRoutingModule,
    MaterialModule,
    CommonModule
  ]
})
export class TablesModule {}
