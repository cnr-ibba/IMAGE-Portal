import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrganismComponent} from './organisms/organism/organism.component';
import {SpecimenComponent} from './specimens/specimen/specimen.component';
import {OrganismsComponent} from './organisms/organisms.component';
import {SpecimensComponent} from './specimens/specimens.component';
import {FilesComponent} from './files/files.component';

const routes: Routes = [
  {path: '', redirectTo: '/tables/organism', pathMatch: 'full'},
  {path: 'organism', component: OrganismsComponent},
  {path: 'organism/:id', component: OrganismComponent},
  {path: 'specimen', component: SpecimensComponent},
  {path: 'specimen/:id', component: SpecimenComponent},
  {path: 'file', component: FilesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablesRoutingModule {}
