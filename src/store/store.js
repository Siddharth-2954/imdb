import {configureStore} from "@reduxjs/toolkit"
import actorReducer from "../features/actorSlice"

export const store = configureStore({
    reducer:{
        actor:actorReducer
    }
})