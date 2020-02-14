import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedersInterfaceComponent } from './breeders-interface.component';

describe('BreedersInterfaceComponent', () => {
  let component: BreedersInterfaceComponent;
  let fixture: ComponentFixture<BreedersInterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreedersInterfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreedersInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
