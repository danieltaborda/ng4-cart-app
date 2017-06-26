
import { CartComponent } from './cart.component';

export const routes = [
  {
    path: '', children: [
      { path: '', component: CartComponent },
      { path: 'cart/checkout', loadChildren: './cart-checkout#CartCheckoutModule' },
    ]
  },
];
