import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';

import {MaterialModule} from './material.module';
import {AppRoutingModule} from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import {TablesService} from './tables/tables.service';
import {Angular2CsvModule} from 'angular2-csv';
import {HttpClientModule} from '@angular/common/http';
import { AboutComponent } from './about/about.component';
import { HelpComponent } from './help/help.component';
import { ApiComponent } from './help/api/api.component';
import { NotExistsPathComponent } from './not-exists-path/not-exists-path.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    HomeComponent,
    SearchComponent,
    AboutComponent,
    HelpComponent,
    ApiComponent,
    NotExistsPathComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AppRoutingModule,
    Angular2CsvModule,
    HttpClientModule
  ],
  providers: [TablesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
