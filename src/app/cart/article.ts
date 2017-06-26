
interface IArticle {
  id: number;
}

export class Order {
  cost: number;
  quantity: number;
  totalCost: number;

  constructor (
    public cost: number,
    public quantity: number
  ) { }

  get subtotal(): number {
    let total = this.cost && this.quantity && this.cost * this.quantity || 0;
    this.totalCost = total;
    return total;
  }

  addQuantity(value : number) {
    return this.quantity = this.quantity + value;
  }

  removeQuantity(value : number) {
    return this.quantity = this.quantity > 0 ? this.quantity - 1 : 0;
  }

}


export class Article implements IArticle {
  cost: number;
  quantity: number;
  description: string;

  order?: Order;

  constructor (
    public description: string,
    public cost: number, public quantity: number
  ) {
    this.id = +new Date();
  }

}
