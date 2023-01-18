import { createReducer } from "@reduxjs/toolkit";
import { addSongToPlaylist } from "../actions/playlistActions";

const initialState = {
  songs: [],
}

const playlistReducer = createReducer(initialState, (builder) => {
  builder.addCase(addSongToPlaylist, (state, action) => {
    state.songs.push(action.payload)
  })
})

export default playlistReducer;
