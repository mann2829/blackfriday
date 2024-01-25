import { configureStore } from "@reduxjs/toolkit";
import dashboardSlice from "./slices/dashboard";

const reducer = {
  dashboard: dashboardSlice,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
