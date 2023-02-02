export interface IShop {
    id: string,
    name: string,
    imgUrl: string,
    address: string,
    neighbourhood: string,
    voting: number
}

export class Shop implements IShop {
    id: string = '';
    name: string = '';
    imgUrl: string = '';
    address: string = '';
    neighbourhood: string = '';
    voting: number = 0

    constructor(init?: Partial<Shop>) {
        Object.assign(this, init);
    }
}