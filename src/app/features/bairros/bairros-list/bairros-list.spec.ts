import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BairrosList } from './bairros-list';

describe('BairrosList', () => {
  let component: BairrosList;
  let fixture: ComponentFixture<BairrosList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BairrosList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BairrosList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
