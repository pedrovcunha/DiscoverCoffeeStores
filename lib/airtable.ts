import { Record, Table } from "airtable";
import { CoffeeStoreAirtableRecord } from "../models/apis/coffeeStoreAirtable";

const Airtable = require('airtable');
const base = new Airtable(
    {
        apiKey: process.env.AIRTABLE_API_KEY
    }).base(process.env.AIRTABLE_BASE_KEY);


export const coffeeStoreAirtable: Table<CoffeeStoreAirtableRecord> = base('coffee-stores');

export const findCoffeeStoreRecordById = async (id: string): Promise<Record<CoffeeStoreAirtableRecord> | null> => {
    const records = await coffeeStoreAirtable.select({
        filterByFormula: `id="${id}"`
    }).firstPage();

    if (records.length > 0) return records[0];

    return null;
}