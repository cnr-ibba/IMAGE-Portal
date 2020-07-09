import {NgModule} from '@angular/core';
import {RouterModule, Routes, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {SearchComponent} from './search/search.component';
import {AboutComponent} from './about/about.component';
import {HelpComponent} from './help/help.component';
import {ApiComponent} from './help/api/api.component';
import {NotExistsPathComponent} from './not-exists-path/not-exists-path.component';
import {SummaryComponent} from './summary/summary.component';
import {GisSearchComponent} from "./gis-search/gis-search.component";
import {BreedersInterfaceComponent} from "./breeders-interface/breeders-interface.component";
import { RedirectGuard } from './redirect.guard';
import { environment } from '../environments/environment';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchComponent},
  { path: 'gis-search', component: GisSearchComponent},
  { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
  { path: 'summary', component: SummaryComponent},
  { path: 'about', component: AboutComponent },
  { path: 'help', component: HelpComponent },
  { path: 'help/api', component: ApiComponent },
  { path: 'breeders-interface', component: BreedersInterfaceComponent},
  {
    // prevent angular router catching /data_portal/ location using wildcards
    // path: by defining a Guard I can ensure that this location will be forwwarded
    // to server when accessing data_portal by URL
    // https://stackoverflow.com/a/51059505/4385116
    path: 'data_portal',
    canActivate: [RedirectGuard],
    component: RedirectGuard,
    data: {
      externalUrl: 'https://www.image2020genebank.eu/data_portal/'
    }
  },
  { path: '**', component: NotExistsPathComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: 'externalUrlRedirectResolver',
      useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
      {
        window.location.href = (route.data as any).externalUrl;
      }
    }
  ]
})
export class AppRoutingModule {}
