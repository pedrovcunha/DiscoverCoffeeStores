import { createContext, useReducer } from "react";
import { IShop, Shop } from "../models/shop";
import { storeReducer } from "./reducers";

export interface ContextState {
    // set the type of state we need to handle with context
    latLong: string,
    coffeeStores: Shop[]
}

// set an empty object as default state
export const initialState: ContextState = {
    latLong: '',
    coffeeStores: [] as Shop[]    
};

export const AppContext = createContext<
    {
        state: ContextState;
        dispatch: React.Dispatch<any>;
    }>(
    {
      state: initialState,
      dispatch: () => null
    }
);

export const AppProvider = ({ children }: any) => {  
    const [state, dispatch] = useReducer(storeReducer, initialState);
    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};