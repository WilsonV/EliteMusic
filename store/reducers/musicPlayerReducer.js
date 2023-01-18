import { createReducer } from "@reduxjs/toolkit";
import { setCurrentSong } from "../actions/musicPlayerActions";

const initialState = {
  currentSong: {},
}

const musicPlayerReducer = createReducer(initialState, (builder) => {
  builder.addCase(setCurrentSong, (state, action) => {
    state.currentSong = action.payload;
  })
})
export default musicPlayerReducer;
