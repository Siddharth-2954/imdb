import {createSlice, nanoid} from "@reduxjs/toolkit";

const initialState = {
    actors : [],
};


const actorSlice = createSlice({
    name:"actors",
    initialState,
    reducers:{
        addActor:(state, action) => {
            state.actors.push({
                id: nanoid(),
                name: action.payload.name,
                movies: action.payload.movies
            });
        },

        removeActor:(state, action) => {
            state.actors = state.actors.filter((actors) => actors.id !== action.payload)
        },
    },
});

export const {addActor, removeActor} = actorSlice.actions
export default actorSlice.reducer