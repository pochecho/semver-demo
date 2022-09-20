import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologiesBulletComponent } from './technologies-bullet.component';

describe('TechnologiesBulletComponent', () => {
  let component: TechnologiesBulletComponent;
  let fixture: ComponentFixture<TechnologiesBulletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnologiesBulletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnologiesBulletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
