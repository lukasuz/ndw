window.onload = () => {
  const BASE_URL = "" // YOUR NODE SERVER

  const video = document.getElementById('video')
  const image = document.getElementById('image')
  const dailyButton = document.getElementById('daily-button')
  const randomButton = document.getElementById('random-button')
  const videoArea = document.getElementById('video-area')

  /* Changes video size according to screen ratio */
  function setVideoAreaSize() {
    if (innerHeight > innerWidth) {
      videoArea.style.height = "240px"
    } else {
      videoArea.style.height = "460px"
    }
  }

  /* Gets the daily ndw and loads it */
  function setDaily() {
    axios.get(BASE_URL+'/videoOfTheDay')
      .then(res => setVideo(res.data.url))
      .catch(err => {
        console.log(err)
        alert(err)
      })
  }

  /* Gets a random ndw and loads it */
  function setRandom() {
    axios.get(BASE_URL+'/randomVideo')
      .then(res => setVideo(res.data.url))
      .catch(err => {
        console.log(err)
        alert(err)
      })
  }

  /* Set the src of the youtube iframe given an url and makes it visible */
  function setVideo(url) {
    video.setAttribute('src', url)
    image.style.display = "none"
    video.style.display = ""
  }

  /* Eventhandler */
  dailyButton.addEventListener('click', setDaily)
  randomButton.addEventListener('click', setRandom)
  window.addEventListener('resize', setVideoAreaSize)

  setVideoAreaSize()

  if (BASE_URL === "") alert('No BASE_URL provided. HTTP calls will fail.')
}
