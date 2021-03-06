import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, ViewChild } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { MaterialModule } from 'src/app/material.module';
import { OrganismsComponent } from './organisms.component';

import { GeoOrganism } from '../cdp.service';

describe('OrganismsComponent', () => {
  let component: TestOrganismsComponent;
  let fixture: ComponentFixture<TestOrganismsComponent>;

  @Component({
    selector: `app-test-organisms`,
    template: `<app-organisms [geoOrganisms]="organismsData"></app-organisms>`
  })
  class TestOrganismsComponent {
    @ViewChild(OrganismsComponent, {static: false})
    public organismsComponent: OrganismsComponent;

    organismsData: GeoOrganism[] = [];
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganismsComponent, TestOrganismsComponent ],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule,
        MaterialModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestOrganismsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create (for gis)', () => {
    expect(component).toBeTruthy();
  });

});
