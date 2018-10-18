import {NgModule} from '@angular/core';
import {TablesComponent} from './tables.component';
import {TablesRoutingModule} from './tables-routing.module';
import {MaterialModule} from "../material.module";

@NgModule({
  declarations: [
    TablesComponent
  ],
  imports: [
    TablesRoutingModule,
    MaterialModule
  ]
})
export class TablesModule {}
