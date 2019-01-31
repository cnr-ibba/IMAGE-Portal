import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {SearchComponent} from './search/search.component';
import {AboutComponent} from './about/about.component';
import {HelpComponent} from './help/help.component';
import {ApiComponent} from './help/api/api.component';
import {NotExistsPathComponent} from './not-exists-path/not-exists-path.component';
import {SummaryMapComponent} from './summary-map/summary-map.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchComponent},
  { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
  { path: 'summary', component: SummaryMapComponent},
  { path: 'about', component: AboutComponent },
  { path: 'help', component: HelpComponent },
  { path: 'help/api', component: ApiComponent },
  { path: '**', component: NotExistsPathComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
