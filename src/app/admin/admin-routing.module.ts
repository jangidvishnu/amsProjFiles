import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AssetsComponent } from './assets/assets.component';
import { EmployeesDetailComponent } from './employees-detail/employees-detail.component';
import { SingleEmployeeComponent } from './single-employee/single-employee.component';


const adminRoutes: Routes = [
  {
    path: 'admin', component: AdminComponent,
    children: [
      { path: '', component: AdminComponent ,pathMatch:'full' },
      { path: 'assets', component: AssetsComponent, outlet: 'adminR' },
      {
        path: 'employees-detail', component: EmployeesDetailComponent, outlet: 'adminR'
      },
    ]
  },
  { path:'admin-emp/detail/:id',component:SingleEmployeeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
