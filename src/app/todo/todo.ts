import { Item } from "../item/item";

export class Todo {
    
    key : string;
    date : number;
    done : boolean = false;
    item : Item;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

    equals(todo: Todo) : boolean {
        let thisDate : Date = new Date(this.date);
        let todoDate : Date = new Date(todo.date);

        if(thisDate.getMonth() == todoDate.getMonth() && thisDate.getFullYear() == todoDate.getFullYear() && this.item.key == todo.item.key)
            return true;
        return false;
    }

}
