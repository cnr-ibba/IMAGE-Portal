import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotExistsPathComponent } from './not-exists-path.component';

describe('NotExistsPathComponent', () => {
  let component: NotExistsPathComponent;
  let fixture: ComponentFixture<NotExistsPathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotExistsPathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotExistsPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
