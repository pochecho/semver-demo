import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FigmaDesignComponent } from './figma-design.component';

describe('FigmaDesignComponent', () => {
  let component: FigmaDesignComponent;
  let fixture: ComponentFixture<FigmaDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FigmaDesignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FigmaDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
