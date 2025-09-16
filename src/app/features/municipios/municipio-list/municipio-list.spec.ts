import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipioList } from './municipio-list';

describe('MunicipioList', () => {
  let component: MunicipioList;
  let fixture: ComponentFixture<MunicipioList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MunicipioList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MunicipioList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
