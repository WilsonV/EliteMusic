import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, StatusBar as ReactStatusBar } from 'react-native';
import MusicPlayer from './components/MusicPlayer';
import Header from './components/Header';

export default function App() {
  return (
    <View style={styles.container}>
      {/*Header*/}
      <Header />

      <View style={styles.content}>
        <MusicPlayer />
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
