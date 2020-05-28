import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule } from '@angular/forms';
import { EmployeesDetailComponent } from './employees-detail/employees-detail.component';
import { AssetsComponent } from './assets/assets.component';




@NgModule({
  declarations: [AdminComponent,
    EmployeesDetailComponent,
    AssetsComponent],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
