import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './shared/login/login.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ProductlistComponent } from './Admin/productlist/productlist.component';
import { UserdetailsComponent } from './Admin/productlist/userdetails/userdetails.component';
import { LanguagesComponent } from './Admin/productlist/languages/languages.component';
import { LoctionsComponent } from './Admin/loctions/loctions.component';
import { FeedbackComponent } from './Admin/feedback/feedback.component';
import { ReportsComponent } from './Admin/reports/reports.component';
import { ProductsizesComponent } from './Admin/productsizes/productsizes.component';
import { ProductlengthComponent } from './Admin/productlength/productlength.component';
import { RequestsComponent } from './Admin/requests/requests.component';
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { StateComponent } from './Admin/state/state.component';
import { DistrictComponent } from './Admin/district/district.component';
import { MandalComponent } from './Admin/mandal/mandal.component';
import { VillageComponent } from './Admin/village/village.component';
import { VendorproductsComponent } from './Admin/vendorproducts/vendorproducts.component';
import { NotificationComponent } from './Admin/notification/notification.component';
import { CreatesmsComponent } from './Admin/createsms/createsms.component';
// import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms'


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    ProductlistComponent,
    UserdetailsComponent,
    LanguagesComponent,
    LoctionsComponent,
    FeedbackComponent,
    ReportsComponent,
    ProductsizesComponent,
    ProductlengthComponent,
    RequestsComponent,
    StateComponent,
    DistrictComponent,
    MandalComponent,
    VillageComponent,
    VendorproductsComponent,
    NotificationComponent,
    CreatesmsComponent,
    
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot()
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
