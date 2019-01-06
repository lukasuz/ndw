# NDW Backend

Server that provides you with the Neue Deutsche Welle goodness you don't deserve, but still are longig for. Playlists can be easily added, changed or deleted so you could create your own version of this thing.

Needs a Youtube API Key passed as an env Variable as *YOUTUBE_KEY*.

## Commands

Install dependencies: `npm i`

Run Server: `node bin/www` or `nodemon bin/www` with hot reload

Create a new video.json file that provides the API with data: `node scripts/createList.js`. Playlists can be added and deleted in `data/playlists.js`. The new file will be saved in `data/video.json`

## Routes

### /randomVideo

Returns a random Neue Deutsche Welle video


**Returns:**

```json
{
  "title": String,
  "url": String
}
```

### /videoOfTheDay

Returns the Neue Deutsche Welle video of the day.


**Returns:**

```json
{
  "title": String,
  "url": String
}
```
