import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { usersAPI } from "../features/users/usersAPI";
import { loginAPI } from "../features/login/loginAPI";
import { vehiclesAPI } from "../features/vehicles/Vehicles";
import { VehicleSpecificationsAPI } from "../features/vehicles/vehicleSpecs";
import { vehiclesTableAPI } from "../features/vehicles/vehicleTable";
import { bookingVehicleAPI } from "../features/booking/bookingPI";
import userSlice from "../features/users/userSlice";

// persist configuration
const persistConfig = {
    key: 'root',
    storage,
}

// combine reducers
const rootReducer = combineReducers({
    [usersAPI.reducerPath]: usersAPI.reducer,
    [loginAPI.reducerPath]: loginAPI.reducer,
    [vehiclesAPI.reducerPath]: vehiclesAPI.reducer,
    [VehicleSpecificationsAPI.reducerPath]: VehicleSpecificationsAPI.reducer,
    [vehiclesTableAPI.reducerPath]: vehiclesTableAPI.reducer,
    [bookingVehicleAPI.reducerPath]: bookingVehicleAPI.reducer,
    user: userSlice,
});

// add persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// create store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(usersAPI.middleware).concat(loginAPI.middleware).concat(vehiclesAPI.middleware).concat(VehicleSpecificationsAPI.middleware).concat(vehiclesTableAPI.middleware).concat(bookingVehicleAPI.middleware),
});

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;