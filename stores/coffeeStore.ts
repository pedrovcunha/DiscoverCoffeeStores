import { makeAutoObservable } from "mobx";
import { IShop } from "../models/shop";
// NOT IN USE
export default class CoffeeStore {
    coffeeStores: IShop[] = <IShop[]>[];

    constructor() {
        makeAutoObservable(this);
    }

    setCoffeeStores = (value: IShop[]) => {
        this.coffeeStores = value;
    }
}