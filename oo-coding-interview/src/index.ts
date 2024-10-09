
class VendingMachine {

  private _balance = 0;

  get balance() {
    return this._balance;
  }

  public inputCoins(amount: number): void {
    this._balance += amount;
  }

  public buy(item: Item): string {
    
    if(this._balance > item.price) {
      this._balance -= item.price;
      return `Here is your product: ${item.name}`;
    }
    else {
        return "Error: Too little balance";
    }

  }
}

abstract class Item {
  price: number
  name: string

  constructor(price: number, name: string) {
    this.price = price;
    this.name = name;
  }
}

class WaterItem extends Item {

  constructor() {
    super(5, "Water Item");
  }

}


const water = new WaterItem()

const vendingMachine = new VendingMachine()

vendingMachine.inputCoins(3)

vendingMachine.buy(water)


