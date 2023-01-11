import { createApi } from "unsplash-js";
import { FsqStore } from "../models/fsqStore";
import { IShop } from "../models/shop";

// initialise Unsplash. See: https://github.com/unsplash/unsplash-js
const serverApi = createApi({
    accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY as string,
    //...other fetch options
});

interface Props {
    // latitude/longitude (e.g., ll=41.8781,-87.6298)
    ll?: string,
    query?: string,
    limit?: number
}

// endpoint for https://developer.foursquare.com/reference/places-nearby
export const fetchCoffeeStoresInfo = async ({ll, query, limit}: Props) => {
    const foursquareUrl = `https://api.foursquare.com/v3/places/nearby?ll=${ll}&query=${query}&v=20220616&limit=${limit}`;
    const response = await fetch(foursquareUrl, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `${process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY}` 
        }
    });
    const data = await response.json();
    let results = data.results as FsqStore[];

    return results;
}

export const getListOfCoffeeStorePhotos = async () => {
    const apiResponse = await serverApi.search.getPhotos({
        query: "coffee shop",
        perPage: 30
    });

    if (apiResponse.errors) return [];
    const unsplashResults = apiResponse.response.results;
    return unsplashResults.map((result) => result.urls["small"]);
}

// Adelaide CBD coordinates, lat: -34.93112629332741, long: 138.60385834605316
export const fetchCoffeeStores = async (latLong: string = '-34.93112629332741,138.60385834605316', limit: number = 6) => {
    const unsplashPhotos = await getListOfCoffeeStorePhotos();

    const coffeeStores = await fetchCoffeeStoresInfo({
        ll:latLong, 
        query: 'coffee', 
        limit
    });

    return coffeeStores.map((result, i) => {
        const store: IShop = {
            id: result.fsq_id,
            address: result.location.formatted_address,
            name: result.name,
            neighbourhood: result.location.locality? result.location.locality : result.location.region,
            imgUrl: unsplashPhotos.length > 0? unsplashPhotos[i] : '',
            websiteUrl: ''
        }
        return store;
    });
}