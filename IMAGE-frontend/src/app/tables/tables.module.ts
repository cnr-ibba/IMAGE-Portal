import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material.module';
import {TablesRoutingModule} from './tables-routing.module';

import { OrganismsComponent } from './organisms/organisms.component';
import { SpecimensComponent } from './specimens/specimens.component';
import { ExperimentsComponent } from './experiments/experiments.component';
import { OrganismComponent } from './organisms/organism/organism.component';
import { SpecimenComponent } from './specimens/specimen/specimen.component';
import { FiltersComponent } from './filters/filters.component';
import { ExportComponent } from './export/export.component';

@NgModule({
  declarations: [
    OrganismsComponent,
    SpecimensComponent,
    ExperimentsComponent,
    OrganismComponent,
    SpecimenComponent,
    FiltersComponent,
    ExportComponent
  ],
  imports: [
    TablesRoutingModule,
    MaterialModule,
    CommonModule
  ],
})
export class TablesModule {}
