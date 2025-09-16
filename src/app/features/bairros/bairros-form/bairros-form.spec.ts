import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BairrosForm } from './bairros-form';

describe('BairrosForm', () => {
  let component: BairrosForm;
  let fixture: ComponentFixture<BairrosForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BairrosForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BairrosForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
