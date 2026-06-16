import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Autre } from './autre';

describe('Autre', () => {
  let component: Autre;
  let fixture: ComponentFixture<Autre>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Autre],
    }).compileComponents();

    fixture = TestBed.createComponent(Autre);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
