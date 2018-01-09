import { ItemService } from "./item.service";
import { Item } from "./item";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class ItemServiceMock {

  public items : Item[];

  constructor() {
    this.items = [];
    for(let i=1; i <= 4; i++){
      let item = new Item();
      item.key = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa' + i;
      item.name = 'Item name ' + i;
      this.addItem(item);
    }
  }

  getItems(){
    return Observable.of(this.items);
  }
  
  getItemByKey(key: string): Item {
    return this.items
      .filter(item => item.key == key)
      .pop();
  }

  addItem(item: Item): Item {
    if(!item.key)
      item.key = Guid.newGuid();
    this.items.push(item);
    return item;
  }

  deleteItemByKey(key: string) {
    this.items = this.items.filter(item => item.key != key);
  }

  updateItemByKey(key: string, values: Object) {
    let item = this.getItemByKey(key);
    if (!item) {
      return null;
    }
    Object.assign(item, values);
  }

}
class Guid {
  static newGuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
          return v.toString(16);
      });
  }
}
