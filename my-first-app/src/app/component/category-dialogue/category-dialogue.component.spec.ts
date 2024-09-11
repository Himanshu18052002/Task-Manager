import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDialogueComponent } from './category-dialogue.component';

describe('CategoryDialogueComponent', () => {
  let component: CategoryDialogueComponent;
  let fixture: ComponentFixture<CategoryDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryDialogueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
