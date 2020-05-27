import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component'
import { LoginComponent } from './login/login.component'
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';


const appRoutes: Routes = [
  { path: 'employee/:id', component: EmployeeComponent },
  { path: '', component: LoginComponent },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes,{enableTracing:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
