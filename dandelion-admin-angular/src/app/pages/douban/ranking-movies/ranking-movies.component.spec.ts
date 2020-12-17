import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingMoviesComponent } from './ranking-movies.component';

describe('RankingMoviesComponent', () => {
  let component: RankingMoviesComponent;
  let fixture: ComponentFixture<RankingMoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankingMoviesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
