import { Injectable } from '@angular/core';
import { Item } from './item';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ItemService {

  public items: Observable<Item[]>;
  private itemsRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.itemsRef = db.list('items');
    this.items = this.itemsRef.snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  getItems() : Observable<Item[]>{
    return this.items;
  }

  getItemByKey(key : string): Item {
      throw new Error("Method not implemented.");
  }

  addItem(item: Item): Item {
     this.itemsRef.push(item);
     return item;
  }

  deleteItemByKey(key: string) {
     this.itemsRef.remove(key);
  }

  updateItemByKey(key: string, values: Object) {
    this.itemsRef.update(key, values);
  }

}
