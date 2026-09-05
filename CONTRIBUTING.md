# Using `fetchTrendingMovieTrailers()`

## Overview

`fetchTrendingMovieTrailers()` is an asynchronous function that fetches the top 20 trending movie trailers from the YouTube Search API. It searches for videos using a query such as `"official movie trailer"`, orders results by view count, and logs the raw JSON response to the browser console.

## Prerequisites

- A valid YouTube Data API v3 key.
- The function should have access to the API key (either passed as an argument or stored in a configuration file/environment variable).

## Basic Usage

```javascript
await fetchTrendingMovieTrailers();
```

or inside another async function:

```javascript
async function init() {
  await fetchTrendingMovieTrailers();
}

init();
```

If you're not already inside an async function:

```javascript
fetchTrendingMovieTrailers()
  .then(() => {
    console.log("Fetch completed.");
  })
  .catch((error) => {
    console.error("Failed to fetch trailers:", error);
  });
```

## Expected Behavior

When called, the function will:

1. Send a request to the YouTube Search API.
2. Search for videos matching `"official movie trailer"`.
3. Request up to 20 results.
4. Order the results by view count.
5. Log the raw JSON response to the browser console.

Example:

```javascript
await fetchTrendingMovieTrailers();
```

Open your browser's Developer Tools → **Console** to inspect the returned JSON.

## Error Handling

Because the function is asynchronous, always call it with either:

```javascript
try {
  await fetchTrendingMovieTrailers();
} catch (err) {
  console.error(err);
}
```

or

```javascript
fetchTrendingMovieTrailers().catch(console.error);
```

to handle network or API errors gracefully.
