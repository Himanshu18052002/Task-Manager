import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoAdderComponent } from './todo-adder.component';

describe('TodoAdderComponent', () => {
  let component: TodoAdderComponent;
  let fixture: ComponentFixture<TodoAdderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoAdderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
