
import { createContext, useContext } from "react";
import CoffeeStore from "./coffeeStore";
import GeoLocationStore from "./geoLocationStore";
// NOT IN USE
interface MobxStore {
    coffeeStore: CoffeeStore;
    geoLocationStore: GeoLocationStore;
}
export const store: MobxStore = {
    coffeeStore: new CoffeeStore(),
    geoLocationStore: new GeoLocationStore()
}

// export const MobxStoreContext = createContext(store);

// // hook for easy access to our stores
// export function useStore() {
//     return useContext(MobxStoreContext);
// }