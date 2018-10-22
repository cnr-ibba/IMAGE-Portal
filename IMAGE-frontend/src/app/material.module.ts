import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCardModule, MatChipsModule, MatDividerModule,
  MatExpansionModule, MatGridListModule,
  MatIconModule,
  MatListModule, MatPaginatorModule,
  MatSidenavModule, MatSortModule, MatTableModule, MatTabsModule,
  MatToolbarModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatSortModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
    MatChipsModule,
    MatButtonModule
  ],
  exports: [
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatSortModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
    MatChipsModule,
    MatButtonModule
  ]
})
export class MaterialModule {}

