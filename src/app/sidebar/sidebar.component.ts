import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard', icon: 'nc-bank', class: '' },
    { path: '/ProductDetails', title: 'Product Details', icon: 'nc-bank', class: '' },
    { path: '/UserDetails', title: 'Vendor Details', icon: 'nc-single-02', class: '' },
    // { path: '/VendorProducts', title: 'Vendor Products', icon: 'nc-bank', class: ''},
    { path: '/Languages', title: 'Languages', icon: 'nc-caps-small', class: '' },
    { path: '/productsize', title: 'ProductSize', icon: 'nc-spaceship', class: '' },
    { path: '/productlength', title: 'ProductLength', icon: 'nc-spaceship', class: ''},
    // { path: '/Locations', title: 'Locations', icon: 'nc-pin-3', class: ''},
    { path: '/reports', title: 'Reports', icon: 'nc-spaceship', class: '' },
    { path: '/feedback', title: 'Feedback', icon: 'nc-tile-56', class: '' },
    { path: '/requests', title: 'Requests', icon: 'nc-caps-small', class: ''},
    { path: '/Notification', title: 'Notifications', icon: 'nc-caps-small', class: ''},
    { path: '/CreateSms', title: 'Create-SMS', icon: 'nc-caps-small', class: ''},


    // { path: '/ProductDetails',title: 'Icons',             icon:'nc-diamond',    class: '' },
    // { path: '/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' },
    // { path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
    // { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    // { path: '/table',         title: 'Table List',        icon:'nc-tile-56',    class: '' },
    // { path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
    // { path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.css']
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
