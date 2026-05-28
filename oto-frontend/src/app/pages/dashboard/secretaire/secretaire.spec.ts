import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Secretaire } from './secretaire';

describe('Secretaire', () => {
  let component: Secretaire;
  let fixture: ComponentFixture<Secretaire>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Secretaire],
    }).compileComponents();

    fixture = TestBed.createComponent(Secretaire);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
