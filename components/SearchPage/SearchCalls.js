import axios from 'axios'
import config from '../../config'

export default async function makeYoutubeSearch(searchTerm) {
  if (!searchTerm) return []
  try {
    const response = await axios.get('https://youtube.googleapis.com/youtube/v3/search', {
      params: {
        key: config.YOUTUBE_API_KEY,
        part: 'snippet',
        q: searchTerm,
        videoCategoryId: 10,
        type: 'video'
      }
    })

    if (response.status !== 200) return []
    const videoList = response.data.items.map(item => {

      return {
        title: item.snippet.title || 'No Title',
        thumbnail: item.snippet.thumbnails.medium.url,
        videoId: item.id.videoId
      }
    })
    console.log(videoList)
    return videoList
  } catch (error) {
    console.log(error)
    return []
  }

}
