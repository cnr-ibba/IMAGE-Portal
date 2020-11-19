import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';

import { MaterialModule } from '../material.module';
import { GisSearchComponent } from './gis-search.component';
import { GisSearchModule } from './gis-search.module';

describe('GisSearchComponent', () => {
  let component: GisSearchComponent;
  let fixture: ComponentFixture<GisSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GisSearchComponent ],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        LeafletModule,
        LeafletMarkerClusterModule,
        LeafletDrawModule,
        GisSearchModule
      ]
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
