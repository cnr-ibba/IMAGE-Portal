import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material.module';
import {TablesRoutingModule} from './tables-routing.module';

import {TablesComponent} from './tables.component';
import { OrganismsComponent } from './organisms/organisms.component';
import { SpecimensComponent } from './specimens/specimens.component';
import { ExperimentsComponent } from './experiments/experiments.component';
import { OrganismComponent } from './organisms/organism/organism.component';
import { SpecimenComponent } from './specimens/specimen/specimen.component';
import { FiltersComponent } from './filters/filters.component';

@NgModule({
  declarations: [
    TablesComponent,
    OrganismsComponent,
    SpecimensComponent,
    ExperimentsComponent,
    OrganismComponent,
    SpecimenComponent,
    FiltersComponent
  ],
  imports: [
    TablesRoutingModule,
    MaterialModule,
    CommonModule
  ],
})
export class TablesModule {}
