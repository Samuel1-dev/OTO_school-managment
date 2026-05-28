import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionEcole } from './inscription-ecole';

describe('InscriptionEcole', () => {
  let component: InscriptionEcole;
  let fixture: ComponentFixture<InscriptionEcole>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InscriptionEcole],
    }).compileComponents();

    fixture = TestBed.createComponent(InscriptionEcole);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
