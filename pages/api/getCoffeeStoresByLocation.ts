import { NextApiRequest, NextApiResponse } from "next";
import { fetchCoffeeStores } from "../../lib/coffee-stores";
import { Shop } from "../../models/shop";

export type fetchCoffeeStoresResponse = {
    shops: Shop[],
    errorMessage: string
}

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<fetchCoffeeStoresResponse>
) => {
    try {
        const {latLong, limit} = req.query;
        const response = await fetchCoffeeStores(latLong as string, +limit);
        res.status(200);
        res.json({
            shops: response, 
            errorMessage: '' 
        });
    } catch (error: any) {
        res.status(500);
        res.json({
            shops: [],
            errorMessage: `Oh no, Something whent wrong. Error: ${JSON.stringify(error)}`
        })
    }

    return res;
}

export default handler;