import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ACPage } from './ac.page';

describe('ACPage', () => {
  let component: ACPage;
  let fixture: ComponentFixture<ACPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ACPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
