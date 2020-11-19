import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from 'src/app/material.module';
import { SpecimensComponent } from './specimens.component';
import { FiltersComponent } from '../filters/filters.component';

describe('SpecimensComponent', () => {
  let component: SpecimensComponent;
  let fixture: ComponentFixture<SpecimensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MaterialModule
      ],
      declarations: [
        SpecimensComponent,
        FiltersComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecimensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create (for tables)', () => {
    expect(component).toBeTruthy();
  });
});
