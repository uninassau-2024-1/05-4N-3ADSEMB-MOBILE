import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ASPage } from './as.page';

describe('ASPage', () => {
  let component: ASPage;
  let fixture: ComponentFixture<ASPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ASPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
