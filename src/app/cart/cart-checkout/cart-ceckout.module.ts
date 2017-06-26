import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './cart-checkout.routes';
import { CartCheckoutComponent } from './cart-checkout.component';

@NgModule({
  declarations: [
    CartCheckoutComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
})
export class CartCheckoutModule {
  public static routes = routes;
}
