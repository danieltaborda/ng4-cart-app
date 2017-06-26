import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { CartComponent } from './cart';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'cart', loadChildren: './cart#CartModule' },
  { path: 'cart/checkout', loadChildren: './cart/cart-checkout#CartCheckoutModule'},
  { path: '**',    component: NoContentComponent },
];
