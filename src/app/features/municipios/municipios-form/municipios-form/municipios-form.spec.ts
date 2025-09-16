import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipiosForm } from './municipios-form';

describe('MunicipiosForm', () => {
  let component: MunicipiosForm;
  let fixture: ComponentFixture<MunicipiosForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MunicipiosForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MunicipiosForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
