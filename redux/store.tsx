import { configureStore } from "@reduxjs/toolkit";
import shopperReducer from "./shopperSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
// import { PersistGate } from 'redux-persist/integration/react' and persistor (should be imported into _app.tsx)

// the redux persist is used to save data in real time, check the redux toolkit doc, in the usage guide area for installation and other steps

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, shopperReducer);

export const store = configureStore({
  reducer: { shopper: persistedReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
