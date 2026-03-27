import { configureStore } from "@reduxjs/toolkit";

import coreReducer from "./coreSlice";

const store = configureStore({
    reducer : {
        core: coreReducer,
        sliceState: coreReducer, 
    }
})

export default store