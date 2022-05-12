import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput } from "react-native";

export default function SongResult({ song }) {
  return (
    <View style={styles.item}>
      <Image width={'100%'} style={styles.logo} source={{ uri: song.thumbnail }} />
      <Text>{song.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  }
})
