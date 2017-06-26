import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { CartService } from './cart.service';

import { CartArticleComponent } from './cart-article/cart-article.component';

import { Article, Order } from './article';

@Component({
  selector: 'cart',
  styles: [`    
    button { color: #3c3c3c; padding: 0.8em; font-weight: 800; }
    .new-article { margin: 2em 1em 2em 1em; }
  `],
  directives: [CartArticleComponent],
  template: `
    <h1>Cart</h1>
    <nav>
      <a (click)="addNewArticle()">New article</a>
      <a [routerLink]=" ['./checkout'] ">Checkout</a>
    </nav>
    <div class="new-article" *ngIf="tmpNewArticle">
      <span>New article: #{{tmpNewArticle.id}}</span>
      <p>
        <span>Description: <input [(ngModel)]="tmpNewArticle.description"></span>
        <span>Quantity: <input type="number" [(ngModel)]="tmpNewArticle.quantity"></span>
        <span>Cost: <input type="number" [(ngModel)]="tmpNewArticle.cost"></span>
      </p>
      <span>
        <button (click)="saveArticle(tmpNewArticle)">Save</button>
        <button (click)="cancelArticleCreation()">Cancel</button>
      </span>
    </div>
    <div *ngFor="let article of articles" >
      <cart-article [article]="article"
                    (onClickOrderMore)="onClickOrderArticle('more', article)"
                    (onClickOrderLess)="onClickOrderArticle('less', article)"
                    (onClickRemove)="onRemoveArticle({ article: article })">
      </cart-article>
    </div>
  `
})

export class CartComponent implements OnInit {

  public errorMessage: string;

  constructor(
    public cartService: CartService,
  ) {}

  public ngOnInit() {
    this.tmpNewArticle = null;
    this.orders = {};
    this.getArticles();

    this.articles = this.cartService.getServiceArticles();
  }

  getArticles(): void {
    this.cartService.getArticles().then(
        articles => {
          this.articles = articles;
        },
        error =>  this.errorMessage = <string>error);
  }
  saveArticle(newArticle): void {
    this.cartService.addArticle(newArticle).then(
      article => {
        this.articles.push(article);
        this.tmpNewArticle = null;
      },
      error =>  this.errorMessage = <string>error);
  }

  addNewArticle(): void {
    this.tmpNewArticle = new Article('new article ', 0, 0);
  }

  cancelArticleCreation(): void {
    this.tmpNewArticle = null;
  }

  onClickOrderArticle(action, article) {
    switch (action) {
      case 'more':
        if(!article.order) {
          article.order = new Order(article.cost, 1);
        } else {
          article.order.addQuantity(1);
        }
        break;

      case 'less':
        article.order.removeQuantity(1);
        break;
      default:
        return;
    }
  }

  onRemoveArticle(data) {
    this.articles = this.articles.filter( (article) => {
      return article.id !== data.article.id;
    });
  }

}
