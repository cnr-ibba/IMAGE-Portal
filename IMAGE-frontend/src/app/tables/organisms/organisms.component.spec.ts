import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from 'src/app/material.module';
import { OrganismsComponent } from './organisms.component';
import { FiltersComponent } from '../filters/filters.component';

describe('OrganismsComponent', () => {
  let component: OrganismsComponent;
  let fixture: ComponentFixture<OrganismsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MaterialModule
      ],
      declarations: [
        OrganismsComponent,
        FiltersComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganismsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create (for tables)', () => {
    expect(component).toBeTruthy();
  });
});
