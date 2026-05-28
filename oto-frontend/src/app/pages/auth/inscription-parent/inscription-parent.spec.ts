import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionParent } from './inscription-parent';

describe('InscriptionParent', () => {
  let component: InscriptionParent;
  let fixture: ComponentFixture<InscriptionParent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InscriptionParent],
    }).compileComponents();

    fixture = TestBed.createComponent(InscriptionParent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
