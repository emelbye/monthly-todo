export class Item {

    key: string;
    name: string = '';
    auto: boolean = false;
    amount: number = 0;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
