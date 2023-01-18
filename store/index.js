import { configureStore } from "@reduxjs/toolkit";
import musicPlayerReducer from "./reducers/musicPlayerReducer";
import playlistReducer from "./reducers/playlistReducer"
import { loadState, saveState } from "./localStorage";

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    playlist: playlistReducer,
    musicPlayer: musicPlayerReducer
  },
  preloadedState
})

store.subscribe(() => {
  saveState({
    playlist: store.getState().playlist,
    musicPlayer: store.getState().musicPlayer
  })
})

export default store;
