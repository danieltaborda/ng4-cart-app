import { Article } from '../article';
import { CartService } from '../cart.service';

import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'cart-checkout',
  styles: [`
    section { background: #00838f; width: 60%; margin: 1em 0 0 0.5em; }
    .row { width: 100%; min-height: 2em; font-size: 11px; line-height: 4em; }
    .row, div { float: left; min-width: 20%; }
    .row-inner { width: 100%; min-height: 4em; padding: 0; }
    .description { width:60%; text-indent: 1em; }
    .even { background: #e5e9ec; }
    .odd { background: #dee2e4; }
    h1 { color: #fdffff; padding: 0.2em; }
  `],
  template: `
    <section>
      <h1>Cart Checkout</h1>
      
      <div class="row" *ngFor="let article of articles; let even = even; let odd = odd; let first = first; let last = last;">
        <div class="row-inner" *ngIf="first">            
          <div class="description">Description</div>
          <div>Quantity</div>
          <div class="last">Subtotal</div>
        </div>        
        <div class="row-inner" 
             *ngIf="article.order && article.order.quantity > 0" 
             [ngClass]="{ odd: odd, even: even }">            
          <div class="description">{{ article.description }}</div>
          <div>{{ article.order.quantity }}</div>
          <div class="last">{{ article.order.subtotal }}</div>
        </div>
        <div class="row-inner" *ngIf="last">
          <div class="description">&nbsp;</div>
          <div>Total value</div>
          <div class="last">{{ cartCheckoutValue }}</div>
        </div>
      </div>
      
    </section>
  `
})

export class CartCheckoutComponent implements OnInit {

  public articles: Article[];
  public errorMessage: string;
  public cartCheckoutValue: number;

  constructor(
    public cartService: CartService,
  ) {

  }

  public ngOnInit() {
    this.cartCheckoutValue = 0;
    this.articles = this.cartService.articles;
    this.getArticles();
  }

  getArticles(): void {
    this.cartService.getArticles().then(
      articles => {
        this.articles = articles.filter( article => {
          this.cartCheckoutValue += article.order && article.order.subtotal || 0;
          return article.order && article.order.quantity;
        });
      },
      error =>  this.errorMessage = <string>error);
  }

}
