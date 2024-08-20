import { Routes } from '@angular/router';
import { DistrictComponent } from './Admin/district/district.component';
import { MandalComponent } from './Admin/mandal/mandal.component';
import { ProductlistComponent } from './Admin/productlist/productlist.component';
import { StateComponent } from './Admin/state/state.component';
import { VillageComponent } from './Admin/village/village.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthGuard } from './Services/auth.guard';
import { LoginComponent } from './shared/login/login.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  
  {
    path: 'Dashboard',
    redirectTo: 'dashboard',
    canActivate: [AuthGuard],
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
  }]},
  {
    path: '**',
    redirectTo: 'dashboard'
  }
]
