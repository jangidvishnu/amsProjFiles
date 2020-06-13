import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AssetListComponent } from './asset-list/asset-list.component';
import { OldAssetListComponent } from './old-asset-list/old-asset-list.component';


const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'assets', component: AssetListComponent },
  { path: 'oldAssets', component: OldAssetListComponent },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
