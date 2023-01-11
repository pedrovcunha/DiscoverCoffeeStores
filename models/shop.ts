export interface IShop {
    id: number,
    name: string,
    imgUrl: string,
    websiteUrl: string,
    address: string,
    neighbourhood: string
}

export class Shop implements IShop {
    id: number = 0;
    name: string = '';
    imgUrl: string = '';
    websiteUrl: string = '';
    address: string = '';
    neighbourhood: string = '';
}