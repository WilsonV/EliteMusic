import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import SongResult from "./SongResult";

export default function SearchResults({ results }) {
  return (
    <View style={styles.content}>
      {results.map(song => <SongResult key={song.videoId} song={song} />)}
    </View>
  )
}


const styles = StyleSheet.create({

  content: {
    flex: 1,
    alignItems: 'center',
  }
})
