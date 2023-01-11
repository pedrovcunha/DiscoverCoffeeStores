import { makeAutoObservable, reaction } from "mobx";
// NOT IN USE
const LAT_LONG = 'latLong';

export default class GeoLocationStore {
    latLong: string | null = window.localStorage.getItem(LAT_LONG);

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.latLong,
            latLong => {
                if (latLong) window.localStorage.setItem(LAT_LONG, latLong);
                else window.localStorage.removeItem(LAT_LONG);
            }
        )
    }

    setLatLong = (value: string) => {
        this.latLong = value;
    }
}