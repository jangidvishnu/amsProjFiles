import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AssetsComponent } from './assets/assets.component';
import { EmployeesDetailComponent } from './employees-detail/employees-detail.component';
import { SingleEmployeeComponent } from './single-employee/single-employee.component';
import { SingleAssetComponent } from './single-asset/single-asset.component';
import { RequestsComponent } from './requests/requests.component';
import { AssetHistoryComponent } from './asset-history/asset-history.component';


const adminRoutes: Routes = [
  {
    path: 'admin', component: AdminComponent,
    children: [
      { path: '',pathMatch:'full',redirectTo:'/admin/(adminR:assets)' },
      { path: 'assets', component: AssetsComponent, outlet: 'adminR' },
      {
        path: 'employees-detail', component: EmployeesDetailComponent, outlet: 'adminR'
      },
      { path: 'requests', component: RequestsComponent, outlet: 'adminR' },
    ]
  },
  { path:'admin-emp/detail/:id',component:SingleEmployeeComponent },
  { path:'admin-asset/detail/:id',component:SingleAssetComponent},
  { path:'admin-asset/asset-history/:id',component:AssetHistoryComponent},
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
