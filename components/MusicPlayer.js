import { StyleSheet, View, Text, Image, ImageBackground } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import YoutubePlayer from 'youtube-player';
import { useEffect, useState } from "react";


export default function MusicPlayer() {
  let player;

  const [localPlayerState, setLocalPlayerState] = useState(-1);
  console.log("Local State", localPlayerState)

  const currentSong = {
    title: `God's Plan`,
    thumbnail: '../assets/scorpion_cover.jpg',
    videoId: 'm1a_GqJf02M',
    duration: 0,
  }

  useEffect(() => {
    addMusicPlayer();
    console.log("Song Duration:", currentSong.duration)

  })

  async function addMusicPlayer() {
    console.log("Going to play music...", this)
    try {
      let player_div = document.createElement("div")
      player_div.setAttribute('id', 'video-player')
      document.body.appendChild(player_div)

      player = YoutubePlayer('video-player', {
        // height: '0',
        // width: '0',
        videoId: currentSong.videoId,
        playerVars: {
          autoplay: true,
          loop: false,
        },

      })
      player.loadVideoById(currentSong.videoId)
      player.unMute()

      await player.playVideo()
      //setLocalPlayerState(await player.getPlayerState())
      //currentSong.duration = await player.getDuration()
      //console.log("Duration Found", currentSong.duration)
      //console.log("Playing video...", player)
    } catch (error) {
      console.log(error)
    }
  }

  const playPause = async function (event) {
    const player_state = await player.getPlayerState()
    const button = event.target

    console.log(button)

    if (button.id === 'play-button') {
      button.hidden = 'hidden'
      const pause_button = document.getElementById('pause-button')
      pause_button.hidden = '';

    } else if (button.id === 'pause-button') {
      button.hidden = 'hidden'

      const play_button = document.getElementById('play-button')
      play_button.hidden = '';
    }

    if (player_state === 2) {
      await player.playVideo()
      console.log("Played Video")
      event.target.name = 'play-sharp'
    } else if (player_state === 1) {
      await player.pauseVideo()
      console.log("Paused Video")
      event.target.name = 'pause-sharp'
    }
  }

  return (
    <ImageBackground style={styles.backgroundImage} source={require('../assets/scorpion_cover.jpg')}>
      {/* <View nativeID='video-player'><Text>This is the music player{console.log("Player DIV created")}</Text></View> */}
      {/* {addMusicPlayer()} */}
      <View style={styles.container}>


        <View style={styles.songTitleContainer}>
          <Text style={styles.songTitle}>{currentSong.title}</Text>
        </View>

        <View style={styles.artWorkContainer}>
          <Image style={styles.artWork} source={require('../assets/scorpion_cover.jpg')} />
        </View>

        <View style={styles.playSlider}>
          <Text>0:00 | {localPlayerState}</Text>
          <Slider minimumValue={0} maximumValue={100} value={0} />
        </View>

        <View style={styles.playButtons}>
          <Ionicons name='shuffle-sharp' size={24} />
          <Ionicons name='play-back-sharp' size={24} />
          <Ionicons name='play-sharp' nativeID="play-button" size={24} onPress={playPause} />
          <Ionicons name='pause-sharp' nativeID="pause-button" size={24} onPress={playPause} />
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
