import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material.module';
import {TablesRoutingModule} from './tables-routing.module';

import { OrganismsComponent } from './organisms/organisms.component';
import { SpecimensComponent } from './specimens/specimens.component';
import { OrganismComponent } from './organisms/organism/organism.component';
import { SpecimenComponent } from './specimens/specimen/specimen.component';
import { FiltersComponent } from './filters/filters.component';
import { FilesComponent } from './files/files.component';

@NgModule({
  declarations: [
    OrganismsComponent,
    SpecimensComponent,
    OrganismComponent,
    SpecimenComponent,
    FiltersComponent,
    FilesComponent
  ],
  imports: [
    TablesRoutingModule,
    MaterialModule,
    CommonModule
  ],
})
export class TablesModule {}
