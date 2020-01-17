import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GisSearchComponent } from './gis-search.component';

describe('GisSearchComponent', () => {
  let component: GisSearchComponent;
  let fixture: ComponentFixture<GisSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GisSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GisSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
