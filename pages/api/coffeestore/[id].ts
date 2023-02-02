import { FieldSet } from "airtable";
import AirtableError from "airtable/lib/airtable_error";
import { NextApiRequest, NextApiResponse } from "next";
import { coffeeStoreAirtable, findCoffeeStoreRecordById } from "../../../lib/airtable";
import { ApiError } from "../../../models/apis/apiError";
import { UpsertCoffeeStoreRequest, UpsertCoffeeStoreResponse } from "../../../models/apis/coffeeStoreAirtable";

export interface UpdateVotesRequest {
    voting: number;
}
export interface UpdateVotesResponse {
    error: ApiError 
}
// Note the routing difference is for testing apis with dynamic routing only
const updateCoffeeStoreVotes = async (
    req: NextApiRequest,
    res: NextApiResponse<any>
) => {    
    if(req.method === 'PUT')
    {
        try {
            let {id} = req.query;
            const { voting } = req.body as UpdateVotesRequest;

            // Unprocessable Entity - Validation Error
            if (!id) {
                res.status(422),
                res.json(new UpsertCoffeeStoreResponse({error: {message: 'Invalid Id'}}));
            }

            const findCoffeeStoreRecord = await findCoffeeStoreRecordById(id as string);
            if (!findCoffeeStoreRecord) return res.status(404).json({error: {message: 'Id not found'}});

            const updateRecords = await coffeeStoreAirtable.update([
                {
                    id: findCoffeeStoreRecord.id, // Note this is the aitable RECORD ID, not our id column
                    fields: {
                        voting: voting
                    }
                }
            ]);

            if (updateRecords.length > 0) return res.status(204).json({});

            return res.status(500).json({error: {message: 'Error updating votes'}});
        } catch (error: any) {
            const err = error as AirtableError;
            res.status(err.statusCode).json({error: { message: err.message }});
        }
    }
    
    // Method Not Allowed
    return res.status(405);
}

export default updateCoffeeStoreVotes;
