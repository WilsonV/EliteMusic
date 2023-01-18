import React from "react";
import { StyleSheet, View, StatusBar as ReactStatusBar } from 'react-native';
import Header from '../Header';
import MusicPlayer from '../MusicPlayer';
import SearchPage from '../SearchPage';
import Playlist from '../Playlist'
import { usePage } from "../PageContext";

export default function NavigationalApp() {
  const page = usePage();

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.content}>
        {page === "musicplayer" && <MusicPlayer />}
        {page === "search" && <SearchPage />}
        {page === "playlist" && <Playlist />}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  }
});
