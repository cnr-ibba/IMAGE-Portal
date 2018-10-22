import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TablesComponent} from './tables.component';
import {OrganismComponent} from './organisms/organism/organism.component';
import {SpecimenComponent} from './specimens/specimen/specimen.component';

const routes: Routes = [
  {path: '', component: TablesComponent},
  {path: 'organism/:id', component: OrganismComponent},
  {path: 'specimen/:id', component: SpecimenComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablesRoutingModule {}
