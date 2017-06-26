import { Injectable } from '@angular/core';

import { Article } from './article';
import { ARTICLES } from './article-items.mocks';

@Injectable()
export class CartService {

  public articles: Article[];

  public getArticles(): Promise<Article[]> {
    return Promise.resolve(ARTICLES);
  }

  public addArticle(Article): Promise<Article> {
    return Promise.resolve(Article);
  }

  public getServiceArticles(): Article[] {
    return this.articles;
  }

}
