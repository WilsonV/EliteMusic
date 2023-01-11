import { StyleSheet, View, Text, Image, ImageBackground } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import YoutubePlayer from 'youtube-player';
import { useEffect, useState } from "react";


const MusicPlayer = () => {
  let duration_update;

  const [songTime, setSongTime] = useState({ seconds: 0, text: '00:00:00' });
  const [player, setPlayer] = useState(null)
  const [barValue, setBarValue] = useState(0)


  const currentSong = {
    title: `God's Plan`,
    thumbnail: '../assets/scorpion_cover.jpg',
    videoId: 'm1a_GqJf02M',
    duration: 1,
    //duration_text: '00:00:00'
  }

  useEffect(async () => {
    console.log(songTime)
    try {
      setBarValue((songTime.seconds / await player.getDuration()) * 100)
    } catch (error) {
      console.log(error)
    }
  }, [songTime])

  useEffect(() => {
    addMusicPlayer();
    console.log("Song Duration:", currentSong.duration)
  }, [])

  useEffect(async function () {
    console.log("Player Value Changed\n", "Player is now", player)
    try {

      player.addEventListener('onStateChange', async (event) => {
        const newState = await player.getPlayerState()
        if (newState === 1) {
          startDurationUpdate()
          console.log("STARTED DURATION UPDATE")
        } else {
          stopDurationUpdate()
          console.log("STOPPED DURATION UPDATE")
        }
      })

      // await player.loadVideoById(currentSong.videoId)
      await player.unMute()
      await player.setPlaybackQuality('small')
      currentSong.duration = await player.getDuration()
      currentSong.duration_text = new Date(currentSong.duration * 1000).toISOString().substring(11, 19);
      console.log("Duration is", currentSong.duration_text)
      // await player.playVideo()
    } catch (error) {
      console.log(error)
    }


  }, [player])

  async function addMusicPlayer() {
    console.log("Going to play music...", this)
    try {
      let player_div = document.createElement("div")
      player_div.setAttribute('id', 'video-player')
      document.body.appendChild(player_div)

      setPlayer(YoutubePlayer('video-player', {
        // height: '0',
        // width: '0',
        videoId: currentSong.videoId,
        playerVars: {
          autoplay: true,
          loop: false,
        },

      }))

      // setTimeout(async () => {
      //   currentSong.duration = await player.getDuration()
      //   console.log("Duration Found", currentSong.duration)
      // }, 1000);

    } catch (error) {
      console.log(error)
    }
  }

  const playPause = async function () {
    const player_state = await player.getPlayerState()
    const pause_button = document.getElementById('pause-button')
    const play_button = document.getElementById('play-button')

    if ([-1, 2].includes(player_state)) {
      await player.playVideo()
      play_button.style.display = 'none';
      pause_button.style.display = 'block';

      console.log("Played Video")
      // currentSong.duration = await player.getDuration()
      // console.log("Duration Found", currentSong.duration)

    } else if (player_state === 1) {
      await player.pauseVideo()
      play_button.style.display = 'block';
      pause_button.style.display = 'none';

      console.log("Paused Video")

    }
  }


  const startDurationUpdate = async function () {
    try {
      //Update from video when starting
      const fetchedSeconds = await player.getCurrentTime();

      setSongTime({
        seconds: fetchedSeconds,
        ...songTime
      })

      //await new Promise(resolve => setTimeout(resolve, 3000))

      duration_update = setInterval(() => {
        updateSongDuration()
      }, 1000);

    } catch (error) {
      console.log(error)
    }

  }

  const stopDurationUpdate = function () {
    clearInterval(duration_update);
    duration_update = null;
  }

  const updateSongDuration = async function () {
    try {
      let { seconds, text } = songTime;
      seconds = songTime.seconds++

      text = new Date(seconds * 1000).toISOString().substring(11, 19)
      console.log("Text is supposed to be", text)

      // console.log("New Info:", {
      //   seconds,
      //   text,
      // })

      // const prog_bar = document.getElementById('song-progress')
      // console.log(prog_bar)
      // let bar_value = (seconds / await player.getDuration()) * 100;
      // console.log("bar value", bar_value)
      // prog_bar.style.flexGrow = bar_value
      setSongTime({
        seconds,
        text
      })

      // console.log("SongTime is now", songTime)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ImageBackground style={styles.backgroundImage} source={require('../assets/scorpion_cover.jpg')}>
      <View style={styles.container}>

        <View style={styles.songTitleContainer}>
          <Text style={styles.songTitle}>{currentSong.title}</Text>
        </View>

        <View style={styles.artWorkContainer}>
          <Image style={styles.artWork} source={require('../assets/scorpion_cover.jpg')} />
        </View>

        <View style={styles.playSlider}>
          <Text nativeID="song-duration">{songTime.text}</Text>
          <Slider minimumValue={0} maximumValue={100} value={barValue} nativeID="song-progress" onSlidingComplete={async (newValue) => {
            let newNumber = (newValue / 100) * await player.getDuration();
            console.log("Seeking to ", newNumber)
            await player.seekTo(newNumber)
            setSongTime({ ...songTime, seconds: newNumber })
          }} />
        </View>

        <View style={styles.playButtons}>
          <Ionicons name='shuffle-sharp' size={24} />
          <Ionicons name='play-back-sharp' size={24} />
          <Ionicons name='play-sharp' nativeID="play-button" size={24} onPress={playPause} />
          <Ionicons name='pause-sharp' nativeID="pause-button" size={24} style={styles.hidden} onPress={playPause} />
          <Ionicons name='play-forward-sharp' size={24} />
          <Ionicons name='repeat-sharp' size={24} />
        </View>

      </View>
    </ImageBackground >
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
  },
  hidden: {
    display: 'none'
  }
})


export default MusicPlayer;
