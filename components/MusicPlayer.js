import { StyleSheet, View, Text, Image, ImageBackground } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import Slider from '@react-native-community/slider';


export default function MusicPlayer() {

  return (
    <ImageBackground style={styles.backgroundImage} source={require('../assets/scorpion_cover.jpg')}>
      <View style={styles.container}>


        <View style={styles.songTitleContainer}>
          <Text style={styles.songTitle}>God's Plan by Drake</Text>
        </View>

        <View style={styles.artWorkContainer}>
          <Image style={styles.artWork} source={require('../assets/scorpion_cover.jpg')} />
        </View>

        <View style={styles.playSlider}>
          <Slider minimumValue={0} maximumValue={100} value={45} />
        </View>

        <View style={styles.playButtons}>
          <Ionicons name='shuffle-sharp' size={24} />
          <Ionicons name='play-back-sharp' size={24} />
          <Ionicons name='play-sharp' size={24} />
          <Ionicons name='play-forward-sharp' size={24} />
          <Ionicons name='repeat-sharp' size={24} />
        </View>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    opacity: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
    opacity: .9
  },
  songTitleContainer: {
    marginTop: 20,
    height: 50,
    justifyContent: "center",
    alignItems: 'center'
  },
  songTitle: {
    fontSize: 30,
  },
  artWorkContainer: {
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  artWork: {
    borderWidth: 2,
    borderColor: 'black',
    width: 200,
    height: 200,
  },
  playSlider: {
    height: 100,
    // backgroundColor: 'rgba(211,211,211,0)',
    justifyContent: 'center',
    paddingEnd: 10,
    paddingStart: 10,
  },
  playButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
})
