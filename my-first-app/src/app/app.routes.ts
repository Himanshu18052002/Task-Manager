import { Routes } from '@angular/router';
import { MainPageComponent } from './component/main-page/main-page.component';
import { TodoAdderComponent } from './component/todo-adder/todo-adder.component';
import { TasksDetailsComponent } from './component/tasks-details/tasks-details.component';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { RegisterPageComponent } from './component/register-page/register-page.component';
import { authGuard } from './protect/auth.guard';
import { AdminPageComponent } from './component/admin-page/admin-page.component';

export const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'home', component: MainPageComponent, canActivate: [authGuard] },
  { path: 'add-todo', component: TodoAdderComponent, canActivate: [authGuard] },
  {
    path: 'add-todo/:i',
    component: TodoAdderComponent,
    canActivate: [authGuard],
  },
  {
    path: 'tasks-details/:i',
    component: TasksDetailsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [authGuard],
  },
];
