import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, StatusBar as ReactStatusBar } from 'react-native';
import Header from './components/Header';
import MusicPlayer from './components/MusicPlayer';
import SearchPage from './components/SearchPage';
import { useState } from 'react'

export default function App() {
  const [page, setPageToShow] = useState('musicplayer')
  return (
    <View style={styles.container}>
      {/*Header*/}
      <Header setPage={setPageToShow} />

      <View style={styles.content}>
        {page === "musicplayer" && <MusicPlayer />}
        {page === "search" && <SearchPage />}
      </View>

      <StatusBar style="auto" />
    </View>
  );
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
