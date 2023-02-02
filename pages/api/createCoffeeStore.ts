import AirtableError from "airtable/lib/airtable_error";
import { NextApiRequest, NextApiResponse } from "next";
import { coffeeStoreAirtable, findCoffeeStoreRecordById } from "../../lib/airtable";
import { UpsertCoffeeStoreRequest, UpsertCoffeeStoreResponse } from "../../models/apis/coffeeStoreAirtable";

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<UpsertCoffeeStoreResponse>
) => {    
    if(req.method === 'POST')
    {
        try {
            let reqBody = req.body as UpsertCoffeeStoreRequest
            const { id, name } = reqBody;

            // Unprocessable Entity - Validation Error
            if (!id) {
                res.status(422),
                res.json(new UpsertCoffeeStoreResponse({error: {message: 'Invalid Id'}}));
            }

            const findCoffeeStoreRecord = await findCoffeeStoreRecordById(id as string);
            if (findCoffeeStoreRecord) {
                return res.json(new UpsertCoffeeStoreResponse({
                    coffeStore: findCoffeeStoreRecord.fields
                }));

            // Create new record
            } else {
                // Unprocessable Entity - Validation Error
                if (!name) {
                    res.status(422),
                    res.json(new UpsertCoffeeStoreResponse({error: {message: 'Invalid Name'}}));
                }
                
                const createRecords = await coffeeStoreAirtable.create([
                    {
                        fields: {...req.body as UpsertCoffeeStoreRequest}
                    }
                ]);

                return res.json(new UpsertCoffeeStoreResponse({ 
                    coffeStore: createRecords[0].fields 
                }));
            }
        } catch (error: any) {
            const err = error as AirtableError;
            res.status(err.statusCode),
            res.json(new UpsertCoffeeStoreResponse({error: { message: err.message }}));
        }
    }
    
    // Method Not Allowed
    return res.status(405);
}

export default handler;
