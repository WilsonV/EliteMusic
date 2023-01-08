import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput } from "react-native";

export default function SongResult({ song }) {
  return (
    <View style={styles.item}>
      <Image style={styles.logo} source={{ uri: song.thumbnail }} />
      <Text style={styles.text}>{song.title} This is a new Song!</Text>
    </View>
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
  logo: {
    width: 200,
    height: '100%',
    borderColor: '#fff',
    borderWidth: '2px',
    resizeMode: 'contain',
    alignself: 'flex-start'
  },
  text: {
    height: 200,
    width: '100vw',
    backgroundColor: 'white',
    alignself: 'flex-start'
  }
})
