import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// need to import MaterialModule even here
import { MaterialModule } from '../material.module';

import { OrganismsComponent } from './organisms/organisms.component';
import { SpecimensComponent } from './specimens/specimens.component';

@NgModule({
  declarations: [
    OrganismsComponent,
    SpecimensComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [
    OrganismsComponent,
    SpecimensComponent
  ]
})
export class GisSearchModule { }
