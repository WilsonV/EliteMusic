import { StyleSheet, View, Text, Image, ImageBackground } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import YoutubePlayer from 'youtube-player';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const MusicPlayer = () => {
  let duration_update;

  const [songTime, setSongTime] = useState({ seconds: 0, text: '00:00:00' });
  const [player, setPlayer] = useState(null)
  const [barValue, setBarValue] = useState(0)

  const currentSong = useSelector(state => state.musicPlayer.currentSong)

  useEffect(async () => {

    try {
      if (!player) return;
      setBarValue((songTime.seconds / await player.getDuration()) * 100)
    } catch (error) {
      console.log(error)
    }
  }, [songTime])

  useEffect(() => {
    addMusicPlayer();
    //console.log("Song Duration:", currentSong.duration)
  }, [])

  useEffect(async function () {
    console.log("Player Value Changed\n", "Player is now", player)
    try {
      if (!player) return;
      console.log("Adding listener to music player")

      player.addEventListener('onStateChange', async (event) => {
        const newState = await player.getPlayerState()
        showProperPlayPauseButton(newState)

        if (newState === 1) {
          startDurationUpdate()
          console.log("STARTED DURATION UPDATE")
        } else {
          stopDurationUpdate()
          console.log("STOPPED DURATION UPDATE")
        }
      })

      await player.loadVideoById(currentSong.videoId)
      await player.unMute()
      await player.setPlaybackQuality('small')

    } catch (error) {
      console.log(error)
    }


  }, [player])

  async function addMusicPlayer() {

    try {
      //Delete old element
      let old_player = document.getElementById('video-player')
      if (old_player) {
        old_player.remove();
      }
      let player_div = document.createElement("div")
      player_div.setAttribute('id', 'video-player')
      document.body.appendChild(player_div)

      setPlayer(YoutubePlayer('video-player', {
        height: '0',
        width: '0',
        videoId: currentSong.videoId,
        playerVars: {
          autoplay: true,
          loop: false,
        },

      }))


    } catch (error) {
      console.log(error)
    }
  }

  const playPause = async function () {
    const player_state = await player.getPlayerState()

    if ([-1, 2].includes(player_state)) {
      await player.playVideo()

    } else if (player_state === 1) {
      await player.pauseVideo()
      console.log("Paused Video")
    }

  }

  const nextSong = async function () {

  }

  const showProperPlayPauseButton = function (player_state) {
    try {
      const pause_button = document.getElementById('pause-button')
      const play_button = document.getElementById('play-button')

      if ([-1, 0, 2].includes(player_state)) {
        //Havent started OR paused
        play_button.style.display = 'block';
        pause_button.style.display = 'none';

      } else if (player_state === 1) {
        //Playing
        play_button.style.display = 'none';
        pause_button.style.display = 'block';

      }

    } catch (error) {
      console.log(error)
    }


  }

  const startDurationUpdate = async function () {
    try {

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

      let seconds = await player.getCurrentTime();
      let text = new Date(seconds * 1000).toISOString().substring(11, 19)

      setSongTime({
        seconds,
        text
      })

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ImageBackground style={styles.backgroundImage} source={currentSong.thumbnail}>
      <View style={styles.container}>

        <View style={styles.songTitleContainer}>
          <Text style={styles.songTitle}>{currentSong.title}</Text>
        </View>

        <View style={styles.artWorkContainer}>
          {currentSong.thumbnail ?
            <Image style={styles.artWork} source={currentSong.thumbnail} /> :
            <Ionicons name="musical-notes" size={100} />}

        </View>

        <View style={styles.playSlider}>
          <Text nativeID="song-duration">{songTime.text}</Text>
          <Slider minimumValue={0} maximumValue={100} value={barValue} nativeID="song-progress" onSlidingComplete={async (newValue) => {
            let newNumber = (newValue / 100) * await player.getDuration();
            console.log("Seeking to ", newNumber)
            await player.seekTo(newNumber)
            //setSongTime({ ...songTime, seconds: newNumber })
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
