export class Item {
    
    key : string;
    name : string = '';
    auto : boolean = false;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
