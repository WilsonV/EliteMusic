import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { setCurrentSong } from "../../store/actions/musicPlayerActions";
import { usePageUpdate } from "../PageContext";

export default function PlaylistSongItem({ Song }) {
  console.log("Song is ", Song)
  const changePageTo = usePageUpdate()
  const dispatch = useDispatch()

  function playSong() {
    dispatch(setCurrentSong({ ...Song }))
    changePageTo('musicplayer')
  }

  return (
    <TouchableOpacity onPress={playSong}>
      <View style={styles.item}>
        <Image style={styles.artwork} source={Song.thumbnail} />
        <Text style={styles.songTitle}>{Song.title}</Text>
      </View>
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
    height: 100,
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
    width: 100,
    height: '100%',
    borderColor: '#fff',
    borderWidth: '2px',
    resizeMode: 'contain',
    alignself: 'flex-start'
  },
  songTitle: {
    height: 100,
    width: '100vw',
    backgroundColor: 'white',
    alignself: 'flex-start'
  }
})
