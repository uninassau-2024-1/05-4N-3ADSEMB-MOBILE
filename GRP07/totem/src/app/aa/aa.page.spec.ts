import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AAPage } from './aa.page';

describe('AAPage', () => {
  let component: AAPage;
  let fixture: ComponentFixture<AAPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AAPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
