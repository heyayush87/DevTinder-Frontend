import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import feedReducer from "./FeedSlice";
import ConnectionSliceReducer from "./ConnectionSlice"
import requestSliceReducer from "./RequestSlice"
const Store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connection: ConnectionSliceReducer,
    requests: requestSliceReducer,
  },
});
export default Store;