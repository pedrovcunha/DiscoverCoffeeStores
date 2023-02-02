import AirtableError from "airtable/lib/airtable_error";
import { NextApiRequest, NextApiResponse } from "next";
import { findCoffeeStoreRecordById } from "../../lib/airtable";
import { UpsertCoffeeStoreResponse } from "../../models/apis/coffeeStoreAirtable";

const getCoffeeStoreById = async (
    req: NextApiRequest,
    res: NextApiResponse<UpsertCoffeeStoreResponse>
) => {
    if (req.method === 'GET') {
        const {id} = req.query;

        try{

            // Unprocessable Entity - Validation Error
            if (!id) {
                res.status(422),
                res.json(new UpsertCoffeeStoreResponse({error: {message: 'Invalid Id'}}));
            }
            const coffeeStoreRecord= await findCoffeeStoreRecordById(id as string);

            if (coffeeStoreRecord) {
                return res.json(new UpsertCoffeeStoreResponse({
                    coffeStore: coffeeStoreRecord.fields
                }));
            }
            res.status(404);
            res.json(new UpsertCoffeeStoreResponse({error: {message: 'store not found'}}))

        } catch(error: any) {
            const err = error as AirtableError;
            res.status(err.statusCode),
            res.json(new UpsertCoffeeStoreResponse({error: { message: err.message }}));
        }
    }

    // Method Not Allowed
    return res.status(405);
}

export default getCoffeeStoreById;