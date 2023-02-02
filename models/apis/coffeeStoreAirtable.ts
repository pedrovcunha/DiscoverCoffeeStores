import { FieldSet } from "airtable";
import { IShop } from "../shop";
import { ApiError } from "./apiError";

export interface UpsertCoffeeStoreRequest extends Partial<IShop>, FieldSet { }
export interface CoffeeStoreAirtableRecord extends Partial<IShop>, FieldSet { }

export class UpsertCoffeeStoreResponse {
    error: ApiError = {message: ''};
    coffeStore: CoffeeStoreAirtableRecord | null = null;

    // Allow us to partially init the object
    constructor(init?:Partial<UpsertCoffeeStoreResponse>) {
        Object.assign(this, init);
    }
}