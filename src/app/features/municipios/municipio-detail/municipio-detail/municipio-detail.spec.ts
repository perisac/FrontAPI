import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipioDetail } from './municipio-detail';

describe('MunicipioDetail', () => {
  let component: MunicipioDetail;
  let fixture: ComponentFixture<MunicipioDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MunicipioDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MunicipioDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
