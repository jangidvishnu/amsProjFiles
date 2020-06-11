import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeesDetailComponent } from './employees-detail/employees-detail.component';
import { AssetsComponent } from './assets/assets.component';
import { SingleEmployeeComponent } from './single-employee/single-employee.component';
import { SingleAssetComponent } from './single-asset/single-asset.component';
import { RequestsComponent } from './requests/requests.component';
import { AssetHistoryComponent } from './asset-history/asset-history.component';




@NgModule({
  declarations: [AdminComponent,
    EmployeesDetailComponent,
    AssetsComponent,
    SingleEmployeeComponent,
    SingleAssetComponent,
    RequestsComponent,
    AssetHistoryComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
