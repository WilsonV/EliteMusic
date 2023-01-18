import { StyleSheet } from "react-native"
import { View } from "react-native-web"
import { useSelector } from "react-redux"
import PlaylistSongItem from "./PlaylistSongItem"

export default function Playlist() {

  const songs = useSelector(state => state.playlist.songs)
  return (
    <View style={styles.content}>
      {songs.map(Song => <PlaylistSongItem key={Song.videoId} Song={Song} />)}
    </View>
  )
}

const styles = StyleSheet.create({

  content: {
    flex: 1,
    alignItems: 'center',
  }
})
