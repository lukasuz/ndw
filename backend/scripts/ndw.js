const utils = require('./utils.js')
const videos = require('../data/videos.json')

/**
* Get the day of the year.
* https://stackoverflow.com/questions/8619879/javascript-calculate-the-day-of-the-year-1-366
* @param {Date} date
* @returns {Number}
*/
function daysIntoYear(date){
  return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
}

/**
* Format the video data to only contain the titel and embed url
* @param {Video}
* @returns {Object}
*/
function format(video) {
  return {
    title: video.title,
    url: 'https://www.youtube-nocookie.com/embed/' + video.id + '?autoplay=1'
  }
}

/**
* Retrieves the video of the day.
* @returns {Object}
*/
module.exports.getVideoOfTheDay = function() {
  return format(videos[daysIntoYear(new Date())])
}


/**
* Retrieves a random video
* @returns {Object}
*/
module.exports.getRandomVideo = function() {
  return format(utils.getRandomElementFromArray(videos))
}
