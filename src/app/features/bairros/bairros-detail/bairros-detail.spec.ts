import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BairrosDetail } from './bairros-detail';

describe('BairrosDetail', () => {
  let component: BairrosDetail;
  let fixture: ComponentFixture<BairrosDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BairrosDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BairrosDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
