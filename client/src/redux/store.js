import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import taskSlice from "./slices/todo/todoSlice.js";
import userSlice from "./slices/user/userSlice.js";
import projectSlice from "./slices/project/projectSlice.js";

// Configuration for persisted slices
const persistConfig = {
  key: "root",
  storage,
  whitelist: [],
};

// Combine reducers
const rootReducer = combineReducers({
  tasks: taskSlice,
  users: userSlice,
  projects: projectSlice,
});

// Wrap rootReducer with persistReducer (only the whitelisted ones will persist)
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
