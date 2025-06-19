import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import feedReducer from "./FeedSlice";
const Store = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer
    }
});
export default Store;