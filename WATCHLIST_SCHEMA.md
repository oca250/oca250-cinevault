# Watchlist LocalStorage Data Schema

## Overview

The Watchlist uses the browser's `localStorage` and its storage for watchlist to save the trailers that a user bookmarks.

The data is stored under the following key:

```javascript
"watchlist"
```

The value is a JSON array.

## Data Structure

A basic watchlist looks like this:

```json
[
  {
    "videoId": "abc123",
    "title": "Example Movie Trailer",
    "description": "Example movie description.",
    "channel": "Example Movies"
  },
  {
    "videoId": "xyz789",
    "title": "Another Movie Trailer",
    "description": "Another movie description.",
    "channel": "Movie Channel"
  }
]
```

## Field Definitions

| Field         | Type   | Purpose                                        |
| ------------- | ------ | ---------------------------------------------- |
| `videoId`     | String | Unique YouTube ID used to identify the trailer |
| `title`       | String | Trailer/movie title                            |
| `description` | String | Trailer description                            |
| `channel`     | String | YouTube channel name                           |

The `videoId` is the most important field because it can be used to determine whether a trailer is already saved.

## Adding a Trailer

When a user clicks the heart/bookmark button, the selected trailer can be added to the array.

Before adding it, check whether its `videoId` is already saved to avoid duplicates.

```javascript
const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

const exists = watchlist.some(movie => movie.videoId === videoId);

if (!exists) {
    watchlist.push(movie);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
}
```

## Removing a Trailer

When the user unchecks/removes a trailer from the watchlist, filter it out using its `videoId`.

```javascript
const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

const updatedWatchlist = watchlist.filter(
    movie => movie.videoId !== videoId
);

localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
```

## Checking Whether a Trailer Is Saved

The card can check the saved array using the video's YouTube ID:

```javascript
const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

const isSaved = watchlist.some(
    movie => movie.videoId === videoId
);
```

If `isSaved` is `true`, the heart icon should appear active/red.

## Watchlist View

The Watchlist view should read the saved items from LocalStorage:

```javascript
const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
```

Only these saved items should be displayed in the Watchlist view.

## Important Rules

* Always use `videoId` as the unique identifier.
* Do not save the same trailer more than once.
* Use `JSON.stringify()` when saving an array to LocalStorage.
* Use `JSON.parse()` when reading the array.
* If the `watchlist` key does not exist, use an empty array.
* Removing an item should only remove the selected `videoId`.
* Changes should be saved immediately so they remain after refreshing the page.

## Testing in DevTools

To inspect the watchlist:

1. Open the application in the browser.
2. click **bookmark button on trailer**
3. Find the `watchlist` button.
4. Remove the trailer and confirm that its `videoId` is removed.
5. Refresh the page and verify that the remaining watchlist items are still present.
