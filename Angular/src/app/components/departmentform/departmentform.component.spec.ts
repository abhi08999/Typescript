import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentformComponent } from './departmentform.component';

describe('DepartmentformComponent', () => {
  let component: DepartmentformComponent;
  let fixture: ComponentFixture<DepartmentformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
