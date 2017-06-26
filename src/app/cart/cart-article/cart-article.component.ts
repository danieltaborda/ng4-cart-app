import { Article } from '../article';

import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'cart-article',
  styles: [`
    button { color: #3c3c3c; padding: 0.8em; font-weight: 800; }
    input, .small { width: 2em; height: 2em; }
    input, .large { width: 6em; }
    section { float: left; min-width: 16em; margin: 0.6em; padding: 1em; background: #d3dcdc; border-radius: 0.6em; max-width: 25% }
    li { list-style-type: none; min-height: 3em; }
    .align-right { float: right; }
    .cart-actions { background: #e5e9ec; padding: 1em; min-height: 2.6em; font-size: 11px }
  `],
  template: `
  <section>
    <div class="align-right" (click)="onClickRemoveArticle()" title="Delete article">X</div>
    <div>
      <h1>{{article.description}}</h1>
      <h2>Id #{{article.id}}</h2>
      <h3>unit cost: {{article.cost}}</h3>
    </div>
    <div class="cart-actions">
      <span *ngIf="article.order && article.order.quantity > 0">
        Qt: <input class="small" [ngModel]="article.order.quantity" disabled>
        Val:<input class="large" [ngModel]="article.order.subtotal" disabled>
      </span>
      <span class="align-right">
        <button (click)="article.order.quantity > 0 && onRemove()">-</button>
        <button (click)="onAdd()">+</button>
      </span>
    </div>
  </section>
  `
})

export class CartArticleComponent implements OnInit {

  // Component - Input data
  @Input() article: Article;

  // Component - exposed events
  @Output() onClickOrderMore = new EventEmitter();
  @Output() onClickOrderLess = new EventEmitter();
  @Output() onClickRemove = new EventEmitter();

  constructor () {
  }

  public ngOnInit() {
  }

  onRemove() {
    this.onClickOrderLess.emit();
  }
  onAdd() {
    this.onClickOrderMore.emit();
  }

  onClickRemoveArticle() {
    // expose the event to the parent component
    this.onClickRemove.emit();
  }

}
