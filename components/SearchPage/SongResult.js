import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, Button } from "react-native";
import { useDispatch } from "react-redux";
import { setCurrentSong } from "../../store/actions/musicPlayerActions";
import { addSongToPlaylist } from "../../store/actions/playlistActions";
import { usePageUpdate } from "../PageContext";

export default function SongResult({ song }) {
  const changePageTo = usePageUpdate()
  const dispatch = useDispatch()

  function playSong() {
    dispatch(setCurrentSong({ ...song }))
    changePageTo('musicplayer')
  }

  function addToPlaylist() {
    dispatch(addSongToPlaylist({ ...song }))
  }
  return (
    <TouchableOpacity onPress={playSong}>
      <View style={styles.item}>
        <Image style={styles.artwork} source={{ uri: song.thumbnail }} />
        <Text style={styles.songTitle}>{song.title}</Text>
      </View>
      <Button style={styles.addToButton} onPress={addToPlaylist} color={'purple'} title="Add To Playlist" accessibilityLabel="Add this song to your playlist" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    flexdirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'left',
    width: '95vw',
    overflow: 'hidden',
    height: 200,
    backgroundColor: 'grey',
    justifycontent: 'center',
    marginBottom: 10,
    marginTop: 10,
    borderColor: 'purple',
    borderWidth: 2,
    marginLeft: 5,
    marginRight: 5,
  },
  artwork: {
    width: 200,
    height: '100%',
    borderColor: '#fff',
    borderWidth: '2px',
    resizeMode: 'contain',
    alignself: 'flex-start'
  },
  songTitle: {
    height: 200,
    width: '100vw',
    backgroundColor: 'white',
    alignself: 'flex-start'
  }
})
