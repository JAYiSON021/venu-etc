import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueMainComponent } from './venue-main.component';

describe('VenueListComponent', () => {
  let component: VenueMainComponent;
  let fixture: ComponentFixture<VenueMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
