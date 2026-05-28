import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Superviseur } from './superviseur';

describe('Superviseur', () => {
  let component: Superviseur;
  let fixture: ComponentFixture<Superviseur>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Superviseur],
    }).compileComponents();

    fixture = TestBed.createComponent(Superviseur);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
