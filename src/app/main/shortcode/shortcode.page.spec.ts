import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShortcodePage } from './shortcode.page';

describe('ShortcodePage', () => {
  let component: ShortcodePage;
  let fixture: ComponentFixture<ShortcodePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortcodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
