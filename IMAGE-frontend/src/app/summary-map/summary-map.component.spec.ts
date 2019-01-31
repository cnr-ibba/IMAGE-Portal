import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryMapComponent } from './summary-map.component';

describe('SummaryMapComponent', () => {
  let component: SummaryMapComponent;
  let fixture: ComponentFixture<SummaryMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
