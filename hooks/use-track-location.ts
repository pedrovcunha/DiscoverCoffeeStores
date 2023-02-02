import { useContext, useState } from "react";
import { AppContext } from "../stores/context";
import {Types } from '../stores/reducers';

export interface Coordinates {
    latitude : number;
    longitude: number;
}

export interface Position {
    coords: Coordinates
}

const useTrackLocation = () => {
    const [locationErrorMsg, setLocationErrorMsg] = useState('');
    const [isFindinglocation, setIsFindingLocation] = useState(false);
    const { dispatch } = useContext(AppContext);
    
    const success = (position: Position) => {     
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
    
        dispatch({
            type: Types.SetLatLong,
            payload: {latLong: `${latitude},${longitude}`}
        });
        setLocationErrorMsg('');
        setIsFindingLocation(false);
    }
    
    const error = () => {
        setIsFindingLocation(false);
        setLocationErrorMsg('Unable to retrieve your location');
    }
    
    const handleTrackLocation = () => {
        setIsFindingLocation(true);
        
        if (!navigator.geolocation) {
            setLocationErrorMsg('Geolocation is not supported by your browser');
        } else {
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }
    return {        
        // latLong,
        handleTrackLocation,
        locationErrorMsg,
        isFindinglocation
    }
}

export default useTrackLocation;