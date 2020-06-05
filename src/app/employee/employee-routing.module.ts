import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { ReqHistoryComponent } from './req-history/req-history.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const employeeRoutes: Routes = [
  {
    path: 'employee/:id', component: EmployeeComponent,
    children: [
      { path: '',pathMatch:'full',component:EmployeeComponent },
      { path:'dashboard' , component:DashboardComponent , outlet:'employeeR'},
      { path: 'reqHist', component: ReqHistoryComponent, outlet: 'employeeR' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(employeeRoutes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
