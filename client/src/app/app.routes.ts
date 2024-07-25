import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./employee/employee-list/employee-list.component').then(
        (c) => c.EmployeeListComponent
      ),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./employee/add-employee/add-employee.component').then(
        (c) => c.AddEmployeeComponent
      ),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./employee/edit-employee/edit-employee.component').then(
        (c) => c.EditEmployeeComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
