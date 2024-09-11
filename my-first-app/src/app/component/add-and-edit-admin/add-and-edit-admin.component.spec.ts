import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAndEditAdminComponent } from './add-and-edit-admin.component';

describe('AddAndEditAdminComponent', () => {
  let component: AddAndEditAdminComponent;
  let fixture: ComponentFixture<AddAndEditAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAndEditAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAndEditAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
