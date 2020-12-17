import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualMoviesComponent } from './annual-movies.component';

describe('AnnualMoviesComponent', () => {
  let component: AnnualMoviesComponent;
  let fixture: ComponentFixture<AnnualMoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnualMoviesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
