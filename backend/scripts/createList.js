require('dotenv').config()

const fs = require('fs')
const utils = require('./utils.js')
const YouTube = require('simple-youtube-api')

const playlists = require('../data/playlists.js').playlists
const Y = new YouTube(process.env.YOUTUBE_KEY)

/**
* Creates a filtered List of videos based on the playlists in data/playlists.js
* and saves it in data/videos.js
*/
async function createVideoList() {
  try {
    let videos = await getVideosOfPlaylists(playlists)
    videos = filterVideos(videos)
    videos = removeDuplicates(videos)
    videos = utils.shuffle(videos)
    videos = fillUpVideos(videos)

    fs.writeFileSync(__dirname + '/../data/videos.json', JSON.stringify(videos))
    console.log('Videos saved. Amount: ', videos.length)
  } catch (err) {
    console.log('Could not create video list: ', err)
  }
}

/**
* Retrieves videos from multiple playlists
* @param {Array<Object>} playlists, see playlists.js
* @returns {Promise}
*/
function getVideosOfPlaylists(playlists) {
  return Promise.all(playlists.map(playlist => getVideosOfPlaylist(playlist)))
    .then(playlists => playlists.reduce((a1, a2) => a1.concat(a2)))
    .catch(err => Promise.reject(err))
}

/**
* Retrieves videos from a given youtube playlist
* @param {Object} playlists, see playlists.js
* @returns {Promise}
*/
function getVideosOfPlaylist(playlist) {
  return Y.getPlaylist(playlist.url)
    .then(playlist => playlist.getVideos())
    .then(videos => videos)
    .catch(err => Promise.reject(err))
}

/**
* Fills up videos array in case it contains less than 366 videos
* @param {Array<video>}
* @returns {Array<video>}
*/
function fillUpVideos(videos) {
  const diff = 366 - videos.length
  for (let i = 0; i < diff; i++) {
    videos.push(utils.getRandomElementFromArray(videos))
  }
  return videos
}

/**
* Removes duplicates
* @param {Array<video>}
* @returns {Array<video>}
*/
function removeDuplicates(videos) {
  const idMap = new Map()
  videos.forEach(video => idMap.set(video.id, video))
  console.log(videos.length - idMap.size, " Duplicates deleted")
  return Array.from(idMap.values())
}

/**
* Filters out private, deleted and blocked videos
* @param {Array<video>}
* @returns {Array<video>}
*/
function filterVideos(videos) {
  const forbiddenStrings = ["private video", "deleted video", "blocked"]

  return videos.filter(video => {
    let valid = true
    forbiddenStrings.some(string => {
      const videoTitle = video.title.toLowerCase()
      if (videoTitle.includes(string)) {
        valid = false
        return
      }
    })
    return valid
  })
}


createVideoList()
