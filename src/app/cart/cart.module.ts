import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './cart.routes';

import { CartComponent } from './cart.component';
import { CartArticleComponent } from './cart-article/cart-article.component';

console.log('`Cart` loaded asynchronously');

@NgModule({
  declarations: [
    CartComponent,
    CartArticleComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
})

export class CartModule {
  public static routes = routes;
}

