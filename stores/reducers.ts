import { IShop } from "../models/shop";
import { ContextState } from "./context";

type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
    }
    : {
        type: Key;
        payload: M[Key];
    }
};
  
export enum Types {
    SetLatLong = 'SET_LAT_LONG',
    SetCoffeeStores = 'SET_COFFEE_STORES'
}

// Store
export type StoreType = {
    latLong: string,
    coffeeStores: IShop[]
}

export type StorePayload = {
    [Types.SetLatLong] : {
        latLong: string,
        coffeeStores: IShop[]
    },
    [Types.SetCoffeeStores] : {
        latLong: string,
        coffeeStores: IShop[]
    }
}

export type StoreActions = ActionMap<StorePayload>[keyof ActionMap<StorePayload>];

export const storeReducer = (state: ContextState, action: StoreActions) => {
    switch (action.type) {
        case Types.SetLatLong: {
            return { ...state, latLong: action.payload.latLong  as string};
        }
        case Types.SetCoffeeStores: {
            return { ...state, coffeeStores: action.payload.coffeeStores as IShop[] };
        }
        default:
            throw new Error(`Unhandled action type: ${JSON.stringify(action)}`);
    }
};