import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { ProductdetailsComponent } from 'app/pages/productdetails/productdetails.component';
import { ProductlistComponent } from 'app/Admin/productlist/productlist.component';
import { UserdetailsComponent } from 'app/Admin/productlist/userdetails/userdetails.component';
import { LanguagesComponent } from 'app/Admin/productlist/languages/languages.component';
import { LoctionsComponent } from 'app/Admin/loctions/loctions.component';
import { FeedbackComponent } from 'app/Admin/feedback/feedback.component';
import { ReportsComponent } from 'app/Admin/reports/reports.component';
import { ProductsizesComponent } from 'app/Admin/productsizes/productsizes.component';
import { ProductlengthComponent } from 'app/Admin/productlength/productlength.component';
import { RequestsComponent } from 'app/Admin/requests/requests.component';
import { StateComponent } from 'app/Admin/state/state.component';
import { DistrictComponent } from 'app/Admin/district/district.component';
import { MandalComponent } from 'app/Admin/mandal/mandal.component';
import { VillageComponent } from 'app/Admin/village/village.component';
import { VendorproductsComponent } from 'app/Admin/vendorproducts/vendorproducts.component';
import { NotificationComponent } from 'app/Admin/notification/notification.component';
import { CreatesmsComponent } from 'app/Admin/createsms/createsms.component';
import { AuthGuard } from 'app/Services/auth.guard';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent },
    { path: 'user', component: UserComponent },
    { path: 'table', component: TableComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'upgrade', component: UpgradeComponent },
    // {
    //     path: 'ProductDetails', 
    //     component: ProductdetailsComponent
    // },
    {
        path: 'ProductDetails',
        canActivate: [AuthGuard],
        component: ProductlistComponent
    },

    {
        path: 'UserDetails',
        canActivate: [AuthGuard],
        component: UserdetailsComponent
    },
    {
        path: 'Languages',
        canActivate: [AuthGuard],
        component: LanguagesComponent
    },
    {
        path: 'Locations',
        canActivate: [AuthGuard],
        component: LoctionsComponent
    },
    {
        path: 'feedback',
        canActivate: [AuthGuard],
        component: FeedbackComponent
    },
    {
        path: 'reports',
        canActivate: [AuthGuard],
        component: ReportsComponent
    },
    {
        path: 'productsize',
        canActivate: [AuthGuard],
        component: ProductsizesComponent
    },
    {
        path: 'productlength',
        canActivate: [AuthGuard],
        component: ProductlengthComponent
    },
    {
        path: 'requests',
        canActivate: [AuthGuard],
        component: RequestsComponent
    },

    {
      path: 'State',
      canActivate: [AuthGuard],
      component: StateComponent
    },
    
    {
      path: 'District',
      canActivate: [AuthGuard],
      component: DistrictComponent
    },
  
    {
      path: 'Mandal',
      canActivate: [AuthGuard],
      component: MandalComponent
    },
  
    {
      path: 'Village',
      canActivate: [AuthGuard],
      component: VillageComponent
    },
    {
        path: 'VendorProducts',
        canActivate: [AuthGuard],
        component: VendorproductsComponent
    },
    {
        path: 'Notification',
        canActivate: [AuthGuard],
        component: NotificationComponent
    },
    {
        path: 'CreateSms',
        canActivate: [AuthGuard],
        component: CreatesmsComponent
    }
];
