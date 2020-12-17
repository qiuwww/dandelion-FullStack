import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutWithMenuComponent } from './layout-with-menu.component';

describe('LayoutComponent', () => {
  let component: LayoutWithMenuComponent;
  let fixture: ComponentFixture<LayoutWithMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutWithMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutWithMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
