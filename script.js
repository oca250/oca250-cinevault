// Vidéo ya hero banner ikomoka ku YouTube API
let heroVideo = null;

// TMDB image paths
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
const TMDB_SECURE_IMAGE_BASE = "https://image.tmdb.org/t/p/original";

// Ibikorwa by'ubufatanye gukora URL ya TMDB image hamwe n'ibinyurambuco
function getTmdbImageUrl(posterPath) {
  if (!posterPath) {
    // Gukoresha ibara ry'umuntu nyirwanto ryubufatanye
    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 750'%3E%3Crect fill='%235a4a8a' width='500' height='750'/%3E%3C/svg%3E";
  }
  // Gukoresha URL ya TMDB yizezewe mu gishakashaka cya HTTPS
  return `${TMDB_SECURE_IMAGE_BASE}${posterPath}`;
}

// Amakuru ya filime zigaragara muri Hero Banner
const featuredMovies = [
  {
    id: 1,
    title: "Inception",
    rating: "PG-13",
    genres: "Action · Sci-Fi · Thriller",
    stars: "★★★★★",
    ratingText: "4.8 / 5 · 45,320 ratings",
    description: "A skilled thief who steals corporate secrets through the use of dream-sharing technology.",
    posterPath: "/9gk7adHYeDMPS6McKEruUsADFxW.jpg"
  },
  {
    id: 2,
    title: "The Shawshank Redemption",
    rating: "R",
    genres: "Drama · Crime",
    stars: "★★★★★",
    ratingText: "4.9 / 5 · 82,150 ratings",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption.",
    posterPath: "/lyQBXzpMSILppXiF1m2KwDS12d.jpg"
  },
  {
    id: 3,
    title: "The Dark Knight",
    rating: "PG-13",
    genres: "Action · Crime · Drama",
    stars: "★★★★★",
    ratingText: "4.7 / 5 · 65,800 ratings",
    description: "When the menace known as the Joker wreaks havoc, the Dark Knight must accept one of the worst.",
    posterPath: "/1hnjUJsWEnFveIw1By8lOq5R56.jpg"
  },
  {
    id: 4,
    title: "Interstellar",
    rating: "PG-13",
    genres: "Adventure · Drama · Sci-Fi",
    stars: "★★★★☆",
    ratingText: "4.6 / 5 · 72,440 ratings",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    posterPath: "/gEU2QniE6E77NI6lCu244myL724.jpg"
  },
  {
    id: 5,
    title: "Pulp Fiction",
    rating: "R",
    genres: "Crime · Drama",
    stars: "★★★★★",
    ratingText: "4.8 / 5 · 58,920 ratings",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence.",
    posterPath: "/dM2w364MScsjFjS91ChM2QlQ3fQ.jpg"
  }
];

let currentMovieIndex = 0;

// Iyi function ifasha guhindura umwandiko ugizwe n'ibimenyetso bya HTML
// kugira ngo udakomeretsa umutekano wa page.
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function decodeHtmlEntities(value) {
  const decoder = document.createElement("textarea");
  decoder.innerHTML = String(value);
  return decoder.value;
}

// Menya hero banner hamwe n'amakuru y'indango ya YouTube
function renderHeroBanner(video) {
  if (!video) {
    console.warn("No video data for hero banner");
    return;
  }

  const heroMedia = document.getElementById("hero-media");
  const heroTitle = document.getElementById("hero-title");
  const heroRatingBadge = document.getElementById("hero-rating-badge");
  const heroGenres = document.getElementById("hero-genres");
  const heroStars = document.getElementById("hero-stars");
  const heroRatingText = document.getElementById("hero-rating-text");
  const heroDescription = document.getElementById("hero-description");
  const watchTrailerBtn = document.querySelector(".btn-primary");

  const snippet = video.snippet || {};
  const videoId = video.id?.videoId || "";
  const thumbnailUrl = snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url || "";
  const title = decodeHtmlEntities(snippet.title || "Untitled");
  const description = decodeHtmlEntities(snippet.description || "No description available");
  const channel = decodeHtmlEntities(snippet.channelTitle || "Unknown Channel");
  const publishedDate = snippet.publishedAt ? new Date(snippet.publishedAt).getFullYear() : "New";

  console.log("Rendering hero banner with video:", title);
  console.log("Video ID:", videoId);
  console.log("Thumbnail URL:", thumbnailUrl);

  // Shyiramo amashusho y'indango nka ifondo ryumenyetso
  if (heroMedia && thumbnailUrl) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = function() {
      console.log("✓ Hero thumbnail loaded successfully");
      heroMedia.classList.remove("is-loading");
      heroMedia.style.backgroundImage = `url('${thumbnailUrl}')`;
      heroMedia.style.backgroundSize = "cover";
      heroMedia.style.backgroundPosition = "center";
      heroMedia.style.backgroundRepeat = "no-repeat";
    };
    
    img.onerror = function() {
      console.error("✗ Hero thumbnail failed to load:", thumbnailUrl);
      heroMedia.classList.remove("is-loading");
      heroMedia.style.backgroundImage = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    };
    
    img.src = thumbnailUrl;
    heroMedia.textContent = "";
  }

  // Shinzamivirize umutwe
  if (heroTitle) {
    heroTitle.textContent = title;
  }

  // Shinzamivirize impamyabwenge n'izina ry'ibwina
  if (heroRatingBadge) {
    heroRatingBadge.textContent = "Trending";
  }

  // Shinzamivirize ibwina n'inyandiko n'umwaka
  if (heroGenres) {
    heroGenres.textContent = `${channel} · ${publishedDate}`;
  }

  // Shinzamivirize inzira (YouTube inyandiko — nta rating ihari)
  if (heroStars) {
    heroStars.textContent = "";
  }

  // Shinzamivirize inyandiko y'impamyabwenge
  if (heroRatingText) {
    heroRatingText.textContent = `YouTube · ${publishedDate}`;
  }

  // Shinzamivirize ibisobanuro ku mwandiko wibeshyikiwe
  if (heroDescription) {
    const truncatedDescription = description.length > 200 ? description.substring(0, 200) + "..." : description;
    heroDescription.innerHTML = `<p>${escapeHtml(truncatedDescription)}</p>`;
  }

  // Kubika ID y'indango iyo no gushiraho bouton y'icyonka trailer
  if (watchTrailerBtn && videoId) {
    watchTrailerBtn.onclick = function() {
      openTrailerModal(videoId);
    };
    watchTrailerBtn.style.cursor = "pointer";
  }

  // Kubishyira ku bouton "More Info" uburyo bwo kwerekana amakuru y'indango
  const moreInfoBtn = document.querySelector(".btn-secondary");
  if (moreInfoBtn) {
    moreInfoBtn.onclick = function() {
      openTrailerModal(videoId, title);
    };
    moreInfoBtn.style.cursor = "pointer";
  }

  // Kubika indango y'ubwiyunge ni bu nonko harimo ku nyuma
  if (videoId) {
    trailersCache.set(videoId, { title, description, channel, publishedAt: snippet.publishedAt, thumbnail: thumbnailUrl });
  }
  heroVideo = video;
}

// Kubika trailers zose ni ku kugaragara kwa ubwiyunge
let allTrailers = [];
let currentHeroIndex = 0;
let heroRotationStarted = false;

// API request caching and deduplication
const apiCache = new Map();
const inFlightRequests = new Map();
let cachedDefaultTVQuery = null;

// Track last navigation click to prevent duplicate re-renders of the same view
let lastNavClick = null;

// Current view state: 'home' | 'movies' | 'tvshows'
let currentView = 'home';

// Global flag: when YouTube quota is exhausted, stop ALL future requests immediately
let quotaExhausted = false;

// Iyi function ihindura kuri film ijimwe mu cyiciro cy'amafilime ashyirwaho
function changeHeroMovie(direction = 1) {
  if (!allTrailers || allTrailers.length === 0) {
    console.log("No trailers available for rotation");
    return;
  }
  
  currentHeroIndex = (currentHeroIndex + direction) % allTrailers.length;
  if (currentHeroIndex < 0) {
    currentHeroIndex = allTrailers.length - 1;
  }
  
  console.log("Rotating hero to trailer:", currentHeroIndex + 1, "of", allTrailers.length);
  renderHeroBanner(allTrailers[currentHeroIndex]);
}

// Iyi function iteka ikinema cy'accueil kuburyo bwacyosigarira
function rotateHeroMovieAutomatically() {
  setInterval(() => {
    changeHeroMovie(1);
  }, 8000); // Hindura after 8 seconds
}

// Iyi cache ibika amakuru ya trailers yagaragaye kugira ngo adakenera
// kubisubiramo buri gihe iyo ugerageza kuyibona.
//Watchlist storage setup to local storage
const GLOBAL_WATCHLIST_KEY = "cinevault-watch-list";
const USER_WATCHLIST_PREFIX = "cinevault-watchlist-";

// Each user has their own watchlist keyed by email. Guest (logged out) users
// use a shared guest watchlist.
function getWatchListKey() {
  const email = getSession();
  return email ? `${USER_WATCHLIST_PREFIX}${email}` : GLOBAL_WATCHLIST_KEY;
}

function getWatchList() {
  try {
    return JSON.parse(localStorage.getItem(getWatchListKey()) || "{}") || {};
  } catch (error) {
    return {};
  }
}

function saveWatchList(watchList) {
  localStorage.setItem(getWatchListKey(), JSON.stringify(watchList));
}

function toggleWatchList(video) {
  const watchList = getWatchList();
  const videoId = video.id?.videoId || "";

  if (!videoId) return false;

  if (watchList[videoId]) {
    delete watchList[videoId];
  } else {
    const snippet = video.snippet || {};
    watchList[videoId] = {
      videoId,
      title: snippet.title || "Untitled trailer",
      description: snippet.description || "Trailer preview",
      channel: snippet.channelTitle || "",
      publishedAt: snippet.publishedAt || "",
      thumbnail: snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url || ""
    };
  }

  saveWatchList(watchList);
  return Boolean(watchList[videoId]);
}

// Refresh bookmark button states on the visible trailer grid based on the
// current (per-user) watchlist. Used when login state changes.
function refreshBookmarkStates() {
  const grid = document.getElementById("trailers-grid");
  if (!grid) return;
  const watchList = getWatchList();
  grid.querySelectorAll(".trailer-card").forEach((card) => {
    const vid = card.dataset.videoId;
    const isBookmarked = Boolean(vid && watchList[vid]);
    const btn = card.querySelector(".bookmark-button");
    if (btn) {
      btn.setAttribute("aria-pressed", String(isBookmarked));
      btn.setAttribute("aria-label", isBookmarked ? "Remove from watch list" : "Add to watch list");
      btn.setAttribute("title", isBookmarked ? "Remove from watch list" : "Add to watch list");
      btn.innerHTML = getBookmarkIcon(isBookmarked);
    }
  });
}

function getBookmarkIcon(isBookmarked) {
  return `<svg class="bookmark-icon" width="24" height="30" viewBox="0 0 24 30" aria-hidden="true" focusable="false">
    <path d="M4.5 3.5h15v23l-7.5-5-7.5 5z" fill="${isBookmarked ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>
  </svg>`;
}

function renderWatchList() {
  const grid = document.getElementById("watchlist-grid");
  if (!grid) return;

  const watchList = getWatchList();
  const videos = Object.values(watchList);

  const loggedIn = Boolean(getSession());

  if (!videos.length) {
    grid.innerHTML = loggedIn
      ? '<p class="status-message">Your watchlist is empty. Bookmark trailers to save them to your profile.</p>'
      : '<p class="status-message">Your watchlist is empty. <a href="#" id="watchlist-login-link">Log in</a> to save bookmarks to your profile.</p>';
    const loginLink = grid.querySelector("#watchlist-login-link");
    if (loginLink) {
      loginLink.addEventListener("click", (e) => {
        e.preventDefault();
        openAuthModal("login");
      });
      loginLink.style.color = "#1db954";
    }
    return;
  }

  if (!loggedIn) {
    const notice = document.createElement("p");
    notice.className = "watchlist-notice";
    notice.innerHTML = 'Bookmarks are saved to your profile when <a href="#" id="watchlist-login-link">logged in</a>.';
    const header = document.getElementById("watchlist-section") && document.getElementById("watchlist-section").querySelector(".trailers-header");
    if (header) {
      header.appendChild(notice);
    }
    const loginLink = notice.querySelector("#watchlist-login-link");
    if (loginLink) {
      loginLink.addEventListener("click", (e) => {
        e.preventDefault();
        openAuthModal("login");
      });
      loginLink.style.color = "#1db954";
    }
  }

  grid.innerHTML = videos.map((video) => `
    <article class="trailer-card" data-video-id="${escapeHtml(video.videoId)}" role="button" tabindex="0">
      <div class="trailer-thumb" style="background-image: url('${video.thumbnail}'); background-size: cover; background-position: center;">
        <button class="bookmark-button" type="button" aria-label="Remove from watch list" title="Remove from watch list" aria-pressed="true">${getBookmarkIcon(true)}</button>
        <span class="play-icon">▶</span>
      </div>
      <h3 class="trailer-title">${escapeHtml(video.title)}</h3>
      <p class="trailer-meta">${escapeHtml((video.description || "").slice(0, 90))}</p>
    </article>
  `).join("");

  grid.querySelectorAll(".trailer-card").forEach((card) => {
    const vid = card.dataset.videoId;
    const wData = watchList[vid];
    const bookmarkButton = card.querySelector(".bookmark-button");
    if (bookmarkButton) {
      bookmarkButton.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleWatchList({ id: { videoId: vid }, snippet: wData });
        renderWatchList();
      });
    }
    card.addEventListener("click", openModalHandler);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openModalHandler(event);
      }
    });
  });
}

const trailersCache = new Map();

// Ibika inyandiko y'indanga zishobora guhumba cyangwa zidakwemera itegeko ry'imyaka
const videoStatusCache = new Map();

// Kureba niba indanga ishobora guhumba mu YouTube
async function checkVideoEmbeddability(videoId) {
  if (videoStatusCache.has(videoId)) {
    return videoStatusCache.get(videoId);
  }

  try {
    const url = "https://www.googleapis.com/youtube/v3/videos";
    const params = new URLSearchParams({
      part: "status,snippet",
      id: videoId,
      key: CONFIG.youTube_App
    });

    const response = await fetch(`${url}?${params}`);
    if (!response.ok) throw new Error("Failed to fetch video status");

    const data = await response.json();
    const video = data.items?.[0];

    if (!video) {
      return { embeddable: false, restricted: true, reason: "Video not found" };
    }

    const status = video.status || {};
    const embeddable = status.embeddable !== false;
    const ageRestricted = video.snippet?.contentRating?.ytRating === "ytAgeRestricted";

    const result = {
      embeddable,
      restricted: ageRestricted,
      reason: ageRestricted ? "Age Restricted" : embeddable ? "OK" : "Embedding Disabled"
    };

    videoStatusCache.set(videoId, result);
    console.log(`Video ${videoId} embeddability: ${result.reason}`);

    return result;
  } catch (error) {
    console.error("Error checking video embeddability:", error);
    return { embeddable: false, restricted: true, reason: "Could not verify" };
  }
}

// Iyi function itanga amakuru y'ikintu cyerekana trailer kiri ku card.
function getTrailerDetails(card) {
  const videoId = card.dataset.videoId;
  const details = trailersCache.get(videoId) || {};

  return {
    videoId,
    title: details.title || card.querySelector(".trailer-title")?.textContent || "",
    description: details.description || "",
    channel: details.channel || ""
  };
}

// Iyi function yuzuza urupapuro rw'ibikoresho bya trailers,
// ikerekana amashusho, umutwe, n'ibisobanuro bya buri video.
function renderTrailers(videos) {
  const grid = document.getElementById("trailers-grid");

  if (!grid) {
    return;
  }

  // Niba nta trailers zavuzwe, yerekana ubutumwa bwo kubwira user ko nta byabonetse.
  if (!videos.length) {
    grid.innerHTML = '<p class="status-message">No trailers found. Try another title.</p>';
    return;
  }

  // Kubika trailers zose ni ku kugaragara kwa ubwiyunge
  allTrailers = videos;
  console.log("Loaded", videos.length, "trailers. Setting first trailer as hero banner.");
  
  // Shyiramo igitwa mbere nka hero banner
  if (videos.length > 0) {
    currentHeroIndex = 0;
    renderHeroBanner(videos[0]);
    
    // Tangira kugaragara kwa ubwiyunge inshuro imwe gusa
    if (!heroRotationStarted && videos.length > 1) {
      console.log("Starting hero banner rotation...");
      rotateHeroMovieAutomatically();
      heroRotationStarted = true;
    }
  }

  // Kurema amadanire y'ububiko bwa trailers mu buryo bwo kubona buri trailer.
  grid.innerHTML = videos.map((video) => {
    const snippet = video.snippet || {};
    const title = snippet.title || "Untitled trailer";
    const description = snippet.description || "Trailer preview";
    const year = snippet.publishedAt ? snippet.publishedAt.slice(0, 4) : "New";
    const thumbnail = snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url || "";
    const videoId = video.id?.videoId || "";
    const channel = snippet.channelTitle || "";

    trailersCache.set(videoId, { title, description, channel, publishedAt: snippet.publishedAt, thumbnail });

    return `
      <article class="trailer-card" data-video-id="${videoId}" role="button" tabindex="0">
        <div class="trailer-thumb" style="background-image: url('${thumbnail}'); background-size: cover; background-position: center;">
          <button class="bookmark-button" type="button" aria-label="${getWatchList()[videoId] ? "Remove from watch list" : "Add to watch list"}" title="${getWatchList()[videoId] ? "Remove from watch list" : "Add to watch list"}" aria-pressed="${Boolean(getWatchList()[videoId])}">${getBookmarkIcon(Boolean(getWatchList()[videoId]))}</button>
          <span class="play-icon">▶</span>
          <span class="duration-badge">${year}</span>
        </div>
        <h3 class="trailer-title">${escapeHtml(title)}</h3>
        <p class="trailer-meta">${escapeHtml(description.slice(0, 90))}</p>
      </article>
    `;
  }).join("");

  // Otesha ivyo vyo gufungura igihe ibwina rikunyuranywa
  const trailerCards = grid.querySelectorAll(".trailer-card");
  trailerCards.forEach((card) => {
    const bookmarkButton = card.querySelector(".bookmark-button");
    if (bookmarkButton) {
      bookmarkButton.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        const vid = card.dataset.videoId;
        const video = allTrailers.find((item) => item.id?.videoId === vid);
        const isBookmarked = video ? toggleWatchList(video) : false;
        bookmarkButton.setAttribute("aria-pressed", String(isBookmarked));
        bookmarkButton.setAttribute("aria-label", isBookmarked ? "Remove from watch list" : "Add to watch list");
        bookmarkButton.setAttribute("title", isBookmarked ? "Remove from watch list" : "Add to watch list");
        bookmarkButton.setAttribute("title", isBookmarked ? "Remove from watch list" : "Add to watch list");
        bookmarkButton.innerHTML = getBookmarkIcon(isBookmarked);
      });
    }
    card.addEventListener("click", openModalHandler);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openModalHandler(event);
      }
    });
  });
}

// Iyi function ikurura trailers ziva ku YouTube API ukurikije ijambo ryandikishijwe.
async function loadTrailers(query) {
  const grid = document.getElementById("trailers-grid");

  if (!grid) {
    return;
  }

  if (typeof CONFIG === "undefined" || !CONFIG.youTube_App) {
    grid.innerHTML = '<p class="status-message">API configuration is missing. Please create a config.js file with your YouTube API key.</p>';
    console.error("CineVault: CONFIG.youTube_App is missing. Create config.js based on config.example.js");
    return;
  }

  // Yerekana ko ibintu birimo gutegerezwa mbere yuko amakuru agaruka.
  grid.innerHTML = '<p class="status-message">Loading trailers...</p>';

  const url = "https://www.googleapis.com/youtube/v3/search";
  const params = new URLSearchParams({
    part: "snippet",
    q: query,
    type: "video",
    videoCategoryId: "1",
    order: "viewCount",
    maxResults: 12,
    key: CONFIG.youTube_App
  });

  const requestPromise = fetch(`${url}?${params}`)
    .then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const message = errorData?.error?.message || `Request failed with status ${response.status}`;
        throw new Error(message);
      }
      const data = await response.json();
      return data.items || [];
    });

  inFlightRequests.set(query, requestPromise);

  try {
    const items = await requestPromise;

    if (items.length === 0) {
      grid.innerHTML = '<p class="status-message">No trailers found. Try another title.</p>';
      return;
    }

    apiCache.set(query, items);
    renderTrailers(items);
  } catch (error) {
    console.error("Error loading trailers:", error);
    grid.innerHTML = '<p class="status-message">Unable to load trailers right now. Please try again later.</p>';
  }
}

// Funguza indanga mu modal. Niba indanga ntiyoshobora guhumba, yerekana ifatazo ryo kuyibona kuri YouTube
async function openTrailerModal(videoId, title) {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalVideoContainer = document.querySelector(".modal-video-container");
  const modalPlayer = document.getElementById("modal-player");
  const modalDescription = document.querySelector(".modal-description");

  if (!modal) return;

  const details = trailersCache.get(videoId) || { title: title || "Video Details", description: "No description available.", channel: "" };

  if (modalTitle) {
    modalTitle.textContent = details.title || "Video Details";
  }

  if (modalPlayer) {
    modalPlayer.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" title="${escapeHtml(details.title || 'YouTube video player')}" allow="autoplay; encrypted-media" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;"></iframe>`;
  }

  if (modalDescription) {
    modalDescription.textContent = details.description || "No description available.";
  }

  if (modalVideoContainer) modalVideoContainer.hidden = false;

  modal.style.display = "flex";
}

// Funga modal
function closeModalHandler() {
  const modal = document.getElementById("modal");
  const modalPlayer = document.getElementById("modal-player");
  const modalVideoContainer = document.querySelector(".modal-video-container");

  if (modal) {
    modal.style.display = "none";
  }

  if (modalPlayer) {
    modalPlayer.innerHTML = "";
  }

  if (modalVideoContainer) modalVideoContainer.hidden = false;
}

// Fungura YouTube mu icuba rishya igihe trailer card ikandikishijwe
function openModalHandler(event) {
  event.preventDefault();
  event.stopPropagation();

  const card = event.currentTarget.closest(".trailer-card");
  if (!card) return;

  const videoId = card.dataset.videoId;

  if (videoId) {
    openTrailerModal(videoId);
  }
}

// Otesha ibihoraho bifungwamo modal
function setupModalHandlers() {
  const closeButton = document.querySelector(".modal-close-button");
  const modalOverlay = document.querySelector(".modal-overlay");

  if (closeButton) {
    closeButton.addEventListener("click", closeModalHandler);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener("click", closeModalHandler);
  }

  document.addEventListener("keydown", (event) => {
    const modal = document.getElementById("modal");
    if (event.key === "Escape" && modal && modal.style.display === "flex") {
      closeModalHandler();
    }
  });
}

// Iyi function itega trailers za film zisanzwe ziva ku YouTube.
async function fetchTopMovieTrailers() {
  await loadTrailers("official movie");
}

// Iyi function ishanisha ijambo ryanditswe na serivisi ya trailers.
// Niba nta jambo ryanditswe, yerekana trailers zisanzwe.
async function searchMovieTrailers(query) {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    await fetchTopMovieTrailers();
    return;
  }

  await loadTrailers(normalizedQuery);
}

// ===== TV SHOWS FUNCTIONS =====

// Filter out music videos, gaming, and non-TV content
function isTVShowContent(video) {
  const snippet = video.snippet || {};
  const title = (snippet.title || "").toLowerCase();
  const description = (snippet.description || "").toLowerCase();
  const channel = (snippet.channelTitle || "").toLowerCase();

  // Exclude music videos and songs
  if (title.includes("lyric") || title.includes("music video") ||
      title.includes("official music") || title.includes("song ") ||
      title.includes(" audio ") || title.includes("(audio)") ||
      title.includes("- topic") || title.includes("karaoke") ||
      title.includes("cover ") || title.includes("remix")) {
    return false;
  }

  // Exclude gaming content
  if (title.includes("gameplay") || title.includes("gaming") ||
      title.includes("let's play") || title.includes("walkthrough") ||
      title.includes("game trailer") || title.includes("video game")) {
    return false;
  }

  // Exclude content that is clearly about movies/films
  const isMovieExplicit = (title.includes("movie trailer") || title.includes("film trailer")) &&
                          !title.includes("series") && !title.includes("show") &&
                          !title.includes("season") && !title.includes("episode");
  if (isMovieExplicit) {
    return false;
  }

  return true;
}

// Rank how likely a video is a TV show trailer (higher = more likely)
function getTVShowScore(video) {
  const snippet = video.snippet || {};
  const text = ((snippet.title || "") + " " + (snippet.description || "") + " " + (snippet.channelTitle || "")).toLowerCase();
  const channel = (snippet.channelTitle || "").toLowerCase();

  let score = 0;
  const tvKeywords = ["series", "season", "episode", "show", "trailer",
    "teaser", "official trailer", "first look", "sneak peek",
    "netflix", "hbo", "max", "disney", "disney+", "amazon", "paramount",
    "apple tv", "peacock", "hulu", "prime video", "streaming",
    "original series", "original show", "limited series",
    "part 1", "part 2", "coming soon", "premiere",
    "drama series", "comedy series", "action series", "thriller series",
    "season 1", "season 2", "season 3", "season 4"];

  for (const kw of tvKeywords) {
    if (text.includes(kw)) score += 10;
  }

  // Boost for known TV network channels
  const tvChannels = ["netflix", "hbo", "disney", "paramount", "prime video",
    "apple tv", "hulu", "peacock", "max", "youtube original",
    "cbs", "nbc", "abc", "fox", "bbc", "amc", "fx", "showtime", "starz"];
  for (const ch of tvChannels) {
    if (channel.includes(ch)) score += 15;
  }

  return score;
}

// Filter and rank TV show results
function filterTVShowResults(items) {
  if (!items || items.length === 0) return [];

  const filtered = items.filter(isTVShowContent);

  // Score and sort by TV show relevance
  const scored = filtered.map(item => ({ item, score: getTVShowScore(item) }));
  scored.sort((a, b) => b.score - a.score);

  return scored.map(s => s.item);
}

// Deduplicate videos by videoId
function deduplicateVideos(items) {
  const seen = new Set();
  return items.filter(item => {
    const id = item.id?.videoId;
    if (!id || seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}

// Build a diverse TV show search query
function buildTVShowQuery(userQuery) {
  const q = userQuery.trim().toLowerCase();

  // If user already typed a specific show name, just search that
  if (q.length > 0) {
    return `${userQuery} TV show trailer`;
  }

  // Default general TV show queries
  const queries = [
    "new TV series official trailer",
    "Netflix series official trailer",
    "HBO series official trailer",
    "Disney+ series official trailer",
    "Amazon Prime series official trailer"
  ];

  return queries[Math.floor(Math.random() * queries.length)];
}

// Fetch and display TV show trailers
async function loadTVShowTrailers(query) {
  const grid = document.getElementById("trailers-grid");
  if (!grid) return;

  if (typeof CONFIG === "undefined" || !CONFIG.youTube_App) {
    grid.innerHTML = '<p class="status-message">API configuration is missing. Please create a config.js file with your YouTube API key.</p>';
    console.error("CineVault: CONFIG.youTube_App is missing. Create config.js based on config.example.js");
    return;
  }

  // Use a stable default query so caching works across navigations
  let searchQuery;
  if (query.trim()) {
    searchQuery = buildTVShowQuery(query);
  } else {
    if (!cachedDefaultTVQuery) {
      cachedDefaultTVQuery = buildTVShowQuery("");
    }
    searchQuery = cachedDefaultTVQuery;
  }

  // Check cache first — avoids redundant API calls
  if (apiCache.has(searchQuery)) {
    console.log("Cache hit for TV query:", searchQuery);
    renderTrailers(apiCache.get(searchQuery));
    return;
  }

  // When quota is exhausted, block all new YouTube API requests immediately
  if (quotaExhausted) {
    console.log("YouTube quota exhausted — blocking new TV request for:", searchQuery);
    grid.innerHTML = '<p class="status-message">YouTube API quota has been reached. Please try again later.</p>';
    return;
  }

  // Deduplicate in-flight requests — prevents simultaneous identical calls
  if (inFlightRequests.has(searchQuery)) {
    console.log("Deduplicating in-flight TV request for:", searchQuery);
    try {
      const items = await inFlightRequests.get(searchQuery);
      if (items) renderTrailers(items);
    } catch (_) {}
    return;
  }

  grid.innerHTML = '<p class="status-message">Loading TV show trailers...</p>';

  const url = "https://www.googleapis.com/youtube/v3/search";
  const params = new URLSearchParams({
    part: "snippet",
    q: searchQuery,
    type: "video",
    order: "viewCount",
    maxResults: 15,
    key: CONFIG.youTube_App
  });

  const requestPromise = fetch(`${url}?${params}`)
    .then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const message = errorData?.error?.message || `Request failed with status ${response.status}`;
        throw new Error(message);
      }
      const data = await response.json();
      return data.items || [];
    });

  inFlightRequests.set(searchQuery, requestPromise);

  try {
    const items = await requestPromise;

    if (items.length === 0) {
      grid.innerHTML = '<p class="status-message">No TV show trailers found. Try another search.</p>';
      return;
    }

    const filtered = filterTVShowResults(items);
    const unique = deduplicateVideos(filtered);

    if (unique.length === 0) {
      grid.innerHTML = '<p class="status-message">No TV show trailers found. Try another search.</p>';
      return;
    }

    const result = unique.slice(0, 12);
    apiCache.set(searchQuery, result);
    renderTrailers(result);
  } catch (error) {
    console.error("Error loading TV show trailers:", error);
    const isQuotaError = error.message && error.message.toLowerCase().includes("quota");
    if (isQuotaError) {
      quotaExhausted = true;
      console.warn("YouTube API quota exhausted — all future requests will be blocked until page reload.");
    }
    const errorMsg = isQuotaError
      ? "YouTube API quota has been reached. Please try again later."
      : `Unable to load TV show trailers. ${error.message}`;
    grid.innerHTML = `<p class="status-message">${escapeHtml(errorMsg)}</p>`;
  } finally {
    inFlightRequests.delete(searchQuery);
  }
}

// Load default TV show trailers (when clicking TV Shows nav)
async function fetchTopTVShowTrailers() {
  setPageView("tvshows");
  const sectionTitle = document.getElementById("trailers-section-title");
  if (sectionTitle) sectionTitle.textContent = "TV Shows";

  // Hide categories section when in TV Shows
  const categoriesSection = document.getElementById("categories-section");
  if (categoriesSection) categoriesSection.classList.remove("visible");
  categoriesVisible = false;

  await loadTVShowTrailers("");
}

// Search TV show trailers based on user query
async function searchTVShowTrailers(query) {
  const normalizedQuery = query.trim();
  if (!normalizedQuery) {
    await loadTVShowTrailers("");
    return;
  }
  await loadTVShowTrailers(normalizedQuery);
}

function setPageView(view) {
  const isWatchlist = view === "watchlist";
  const heroBanner = document.getElementById("hero-banner");
  const categoriesSection = document.getElementById("categories-section");
  const trailersSection = document.querySelector(".trailers-section:not(#watchlist-section)");
  const watchlistSection = document.getElementById("watchlist-section");

  [heroBanner, categoriesSection, trailersSection].forEach((element) => {
    if (element) element.classList.toggle("page-hidden", isWatchlist);
  });
  if (watchlistSection) watchlistSection.classList.toggle("page-hidden", !isWatchlist);
  currentView = isWatchlist ? "watchlist" : view;
}

// Switch to home/movies view
function switchToMoviesView() {
  setPageView("home");
  activeGenre = null;
  const sectionTitle = document.getElementById("trailers-section-title");
  if (sectionTitle) sectionTitle.textContent = "Latest Trailers";
  updateActiveGenreButton(null);
  fetchTopMovieTrailers();
}

// Setup navigation handlers for Home, Movies, TV Shows
function setupNavigation() {
  const homeLink = document.getElementById("nav-home");
  const moviesLink = document.getElementById("nav-movies");
  const tvShowsLink = document.getElementById("nav-tvshows");

  if (homeLink) {
    homeLink.addEventListener("click", (e) => {
      e.preventDefault();
      if (lastNavClick === 'home') return;
      lastNavClick = 'home';
      switchToMoviesView();
    });
  }

  if (moviesLink) {
    moviesLink.addEventListener("click", (e) => {
      e.preventDefault();
      if (lastNavClick === 'home') return;
      lastNavClick = 'home';
      switchToMoviesView();
    });
  }

  if (tvShowsLink) {
    tvShowsLink.addEventListener("click", (e) => {
      e.preventDefault();
      if (lastNavClick === 'tvshows') return;
      lastNavClick = 'tvshows';
      fetchTopTVShowTrailers();
    });
  }

  // Setup mobile menu toggle
  const menuToggle = document.getElementById("menu-toggle");
  const siteHeader = document.querySelector(".site-header");
  const navLinks = document.querySelectorAll(".site-header nav a");

  if (menuToggle && siteHeader) {
    const closeMenu = () => {
      siteHeader.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    };

    menuToggle.addEventListener("click", () => {
      const isOpen = siteHeader.classList.toggle("menu-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    });

    navLinks.forEach((link) => link.addEventListener("click", closeMenu));
  }
}

// Amazina y'ibwina bya filime bigenewe Categories
const movieGenres = [
  "Action", "Comedy", "Drama", "Horror", "Sci-Fi",
  "Thriller", "Animation", "Romance", "Adventure", "Fantasy"
];

let activeGenre = null;
let categoriesVisible = false;

// Iyi function itegura ibikoresho bya Categories: ububiko bw'ibwina, bouton, n'uburyo bwo guhitamwo.
function setupCategories() {
  const categoriesSection = document.getElementById("categories-section");
  const categoriesList = document.getElementById("categories-list");
  const categoriesNavLink = document.getElementById("categories-nav-link");
  const sectionTitle = document.getElementById("trailers-section-title");
  const viewAllLink = document.getElementById("trailers-view-all");

  if (!categoriesNavLink || !categoriesList || !categoriesSection) return;

  // Kurema ibyiciro byose mu buryo bworoshye
  categoriesList.innerHTML = movieGenres.map((genre) => {
    return `<button class="category-btn" data-genre="${genre}">${escapeHtml(genre)}</button>`;
  }).join("");

  // Gushyiraho uburyo bwo kwerekana/hiddenCategories
  categoriesNavLink.addEventListener("click", (e) => {
    e.preventDefault();
    categoriesVisible = !categoriesVisible;

    if (categoriesVisible) {
      categoriesSection.classList.add("visible");
    } else {
      categoriesSection.classList.remove("visible");
    }
  });

  // Gushyiraho click handler kuri buri bouton y'ibwina
  const genreButtons = categoriesList.querySelectorAll(".category-btn");
  genreButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const genre = btn.dataset.genre;
      lastNavClick = null;

      // Niba iryo bwina rihariwe, subira ku default
      if (activeGenre === genre) {
        activeGenre = null;
        sectionTitle.textContent = "Latest Trailers";
        fetchTopMovieTrailers();
        updateActiveGenreButton(null);
        return;
      }

      activeGenre = genre;
      sectionTitle.textContent = `${genre} Trailers`;
      updateActiveGenreButton(genre);
      loadTrailers(`${genre} movie trailer`);
    });
  });

  // "View All" link subira ku default
  if (viewAllLink) {
    viewAllLink.addEventListener("click", (e) => {
      e.preventDefault();
      lastNavClick = null;
      activeGenre = null;
      sectionTitle.textContent = "Latest Trailers";
      fetchTopMovieTrailers();
      updateActiveGenreButton(null);
    });
  }
}

//Watchlist link setup
function setupWatchList() {
  const watchlistNavLinks = document.querySelectorAll(".watchlist-nav-link");
  watchlistNavLinks.forEach((watchlistNavLink) => {
    watchlistNavLink.addEventListener("click", (event) => {
      event.preventDefault();
      lastNavClick = null;
      setPageView("watchlist");
      renderWatchList();
    });
  });
  renderWatchList();
}

// Kub.ConnectionStrings ibwina rikoreshwa (active state)
function updateActiveGenreButton(activeGenre) {
  const buttons = document.querySelectorAll(".category-btn");
  buttons.forEach((btn) => {
    if (btn.dataset.genre === activeGenre) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}



// ===== ACCOUNT / AUTH SYSTEM =====
const USERS_STORAGE_KEY = "cinevault-users";
const SESSION_STORAGE_KEY = "cinevault-session";

function getStoredUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || "{}") || {};
  } catch (error) {
    return {};
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

function getSession() {
  return localStorage.getItem(SESSION_STORAGE_KEY) || "";
}

function setSession(email) {
  if (email) {
    localStorage.setItem(SESSION_STORAGE_KEY, email);
  } else {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  }
}

function getInitials(nameOrEmail) {
  const value = (nameOrEmail || "").trim();
  if (!value) return "";
  const parts = value.split(/\s+/);
  if (parts.length > 1) return (parts[0][0] + parts[1][0]).toUpperCase();
  return value.slice(0, 2).toUpperCase();
}

function getSessionUser() {
  const email = getSession();
  if (!email) return null;
  const users = getStoredUsers();
  return users[email] || null;
}

function applyAvatar(container, user) {
  if (!container) return;
  if (user && user.photo) {
    container.style.backgroundImage = `url('${user.photo}')`;
    container.textContent = "";
  } else {
    container.style.backgroundImage = "";
    const name = user ? user.name || user.email : "";
    container.textContent = user ? getInitials(name) : "";
  }
}

function updateAvatar() {
  const avatarBtn = document.getElementById("avatar-btn");
  const user = getSessionUser();

  applyAvatar(avatarBtn, user);

  const menuLogin = document.getElementById("menu-login");
  const menuSignup = document.getElementById("menu-signup");
  const menuLogout = document.getElementById("menu-logout");
  const menuPhoto = document.getElementById("menu-photo");
  const userLabel = document.getElementById("account-menu-user");

  const loggedIn = Boolean(user);
  if (menuLogin) menuLogin.hidden = loggedIn;
  if (menuSignup) menuSignup.hidden = loggedIn;
  if (menuLogout) menuLogout.hidden = !loggedIn;
  if (menuPhoto) menuPhoto.hidden = !loggedIn;
  if (userLabel) {
    userLabel.textContent = loggedIn ? user.name || user.email : "";
    userLabel.hidden = !loggedIn;
  }
}

function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const icons = { success: "✓", error: "✕", warning: "!", info: "i" };
  const toast = document.createElement("div");
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `<span class="toast-icon">${icons[type] || "i"}</span><span>${message}</span>`;
  container.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("toast-visible"));
  setTimeout(() => {
    toast.classList.remove("toast-visible");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

let authMode = "login";
let photoEditMode = false;

function openAuthModal(mode = "login") {
  authMode = mode;
  photoEditMode = false;
  const modal = document.getElementById("auth-modal");
  if (!modal) return;

  const title = document.getElementById("auth-title");
  const submit = document.getElementById("auth-submit");
  const switchBtn = document.getElementById("auth-switch-btn");
  const switchText = document.getElementById("auth-switch-text");
  const nameField = document.getElementById("auth-name-field");
  const errorEl = document.getElementById("auth-error");

  const isSignup = mode === "signup";
  if (title) title.textContent = isSignup ? "Sign Up" : "Login";
  if (submit) submit.textContent = isSignup ? "Sign Up" : "Login";
  if (switchBtn) switchBtn.textContent = isSignup ? "Login" : "Sign Up";
  if (switchText) switchText.textContent = isSignup ? "Already have an account?" : "Don't have an account?";
  if (nameField) nameField.hidden = !isSignup;
  document.getElementById("auth-password").setAttribute("autocomplete", isSignup ? "new-password" : "current-password");
  if (errorEl) errorEl.textContent = "";

  const picker = document.getElementById("auth-avatar-picker");
  const preview = document.getElementById("auth-avatar-preview");
  const removeBtn = document.getElementById("auth-avatar-remove");
  const hiddenData = document.getElementById("auth-avatar-data");
  const fileInput = document.getElementById("auth-avatar-input");
  const switchSection = document.querySelector(".auth-switch");
  if (switchSection) switchSection.style.display = "";

  if (picker) picker.hidden = !isSignup;
  const sessionUser = getSessionUser();
  if (preview) {
    preview.style.backgroundImage = isSignup ? "" : (sessionUser && sessionUser.photo ? `url('${sessionUser.photo}')` : "");
    preview.classList.toggle("has-image", isSignup ? false : Boolean(sessionUser && sessionUser.photo));
  }
  if (removeBtn) removeBtn.hidden = !(sessionUser && sessionUser.photo && !isSignup);
  if (hiddenData) hiddenData.value = isSignup ? "" : ((sessionUser && sessionUser.photo) || "");
  if (fileInput) fileInput.value = "";

  modal.style.display = "flex";
  const emailInput = document.getElementById("auth-email");
  if (emailInput) setTimeout(() => emailInput.focus(), 50);
}

function closeAuthModal() {
  const modal = document.getElementById("auth-modal");
  if (modal) modal.style.display = "none";
}

function closeAccountMenu() {
  const menu = document.getElementById("account-menu");
  if (menu) menu.hidden = true;
}

function handleAuthSubmit(event) {
  event.preventDefault();
  const nameInput = document.getElementById("auth-name");
  const emailInput = document.getElementById("auth-email");
  const passwordInput = document.getElementById("auth-password");
  const errorEl = document.getElementById("auth-error");

  const email = (emailInput.value || "").trim().toLowerCase();
  const password = passwordInput.value || "";
  const name = (nameInput.value || "").trim();

  if (photoEditMode) {
    const photo = document.getElementById("auth-avatar-data").value;
    setSessionUserPhoto(photo);
    updateAvatar();
    closeAuthModal();
    event.currentTarget.reset();
    photoEditMode = false;
    showToast(photo ? "Profile picture updated." : "Profile picture removed.", "success");
    return;
  }

  if (!email || !password) {
    if (errorEl) errorEl.textContent = "Please fill in all required fields.";
    return;
  }

  const photo = document.getElementById("auth-avatar-data") ? document.getElementById("auth-avatar-data").value : "";

  if (authMode === "signup") {
    if (!name) {
      if (errorEl) errorEl.textContent = "Please enter your full name.";
      return;
    }
    if (password.length < 6) {
      if (errorEl) errorEl.textContent = "Password must be at least 6 characters.";
      return;
    }
    const users = getStoredUsers();
    if (users[email]) {
      if (errorEl) errorEl.textContent = "An account with this email already exists.";
      return;
    }
    users[email] = { name, email, password, photo: photo || "" };
    saveUsers(users);
    setSession(email);
    showToast("Account created. Welcome to CineVault!", "success");
  } else {
    const users = getStoredUsers();
    const user = users[email];
    if (!user || user.password !== password) {
      if (errorEl) errorEl.textContent = "Invalid email or password.";
      return;
    }
    setSession(email);
    showToast("Logged in successfully. Welcome back!", "success");
  }

  closeAuthModal();
  updateAvatar();
  renderWatchList();
  refreshBookmarkStates();
  if (event.currentTarget) {
    event.currentTarget.reset();
    const avatarHidden = document.getElementById("auth-avatar-data");
    if (avatarHidden) avatarHidden.value = "";
    const avatarPrev = document.getElementById("auth-avatar-preview");
    const avatarRm = document.getElementById("auth-avatar-remove");
    if (avatarPrev) { avatarPrev.style.backgroundImage = ""; avatarPrev.classList.remove("has-image"); }
    if (avatarRm) avatarRm.hidden = true;
  }
}

function handleLogout() {
  setSession("");
  closeAccountMenu();
  updateAvatar();
  renderWatchList();
  refreshBookmarkStates();
  showToast("You have been logged out.", "info");
}

function toggleAccountMenu() {
  const menu = document.getElementById("account-menu");
  if (!menu) return;
  const willShow = menu.hidden;
  menu.hidden = !willShow;
  if (willShow) updateAvatar();
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function resizeImage(dataUrl, maxSize) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const ratio = Math.min(maxSize / img.width, maxSize / img.height, 1);
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * ratio);
      canvas.height = Math.round(img.height * ratio);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

function setSessionUserPhoto(photo, email) {
  const users = getStoredUsers();
  const userEmail = email || getSession();
  if (userEmail && users[userEmail]) {
    users[userEmail].photo = photo || "";
    saveUsers(users);
  }
}

function setupAccount() {
  const avatarBtn = document.getElementById("avatar-btn");
  const authModal = document.getElementById("auth-modal");
  const menuLogin = document.getElementById("menu-login");
  const menuSignup = document.getElementById("menu-signup");
  const menuLogout = document.getElementById("menu-logout");
  const menuPhoto = document.getElementById("menu-photo");
  const authForm = document.getElementById("auth-form");
  const switchBtn = document.getElementById("auth-switch-btn");
  const closeBtn = document.querySelector(".auth-close");
  const accountMenu = document.getElementById("account-menu");

  const avatarInput = document.getElementById("auth-avatar-input");
  const avatarPreview = document.getElementById("auth-avatar-preview");
  const avatarRemove = document.getElementById("auth-avatar-remove");
  const avatarHiddenData = document.getElementById("auth-avatar-data");

  const setAvatarPreview = (dataUrl) => {
    if (avatarPreview) {
      avatarPreview.style.backgroundImage = dataUrl ? `url('${dataUrl}')` : "";
      avatarPreview.classList.toggle("has-image", Boolean(dataUrl));
    }
    if (avatarHiddenData) avatarHiddenData.value = dataUrl || "";
    if (avatarRemove) avatarRemove.hidden = !dataUrl;
  };

  if (avatarInput) {
    avatarInput.addEventListener("change", async () => {
      const file = avatarInput.files && avatarInput.files[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        showToast("Please choose a valid image file.", "error");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        showToast("Image must be smaller than 5MB.", "error");
        return;
      }
      const raw = await readFileAsDataURL(file);
      const resized = await resizeImage(raw, 256);
      setAvatarPreview(resized);
    });
  }

  if (avatarPreview) {
    avatarPreview.addEventListener("click", () => avatarInput && avatarInput.click());
  }

  if (avatarRemove) {
    avatarRemove.addEventListener("click", () => {
      if (avatarInput) avatarInput.value = "";
      if (authMode === "signup") {
        setAvatarPreview("");
      } else {
        setSessionUserPhoto("");
        updateAvatar();
        setAvatarPreview("");
        showToast("Profile picture removed.", "info");
      }
    });
  }

  if (avatarBtn) {
    avatarBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleAccountMenu();
    });
  }

  if (menuLogin) {
    menuLogin.addEventListener("click", () => {
      closeAccountMenu();
      openAuthModal("login");
    });
  }
  if (menuSignup) {
    menuSignup.addEventListener("click", () => {
      closeAccountMenu();
      openAuthModal("signup");
    });
  }
  if (menuLogout) menuLogout.addEventListener("click", handleLogout);

  if (menuPhoto) {
    menuPhoto.addEventListener("click", (e) => {
      e.stopPropagation();
      closeAccountMenu();
      openAuthModal("signup");
      photoEditMode = true;
      authMode = "login";
      document.getElementById("auth-title").textContent = "Change Profile Picture";
      document.getElementById("auth-submit").textContent = "Save Photo";
      const nameField = document.getElementById("auth-name-field");
      if (nameField) nameField.hidden = true;
      const switchSection = document.querySelector(".auth-switch");
      if (switchSection) switchSection.style.display = "none";
      const picker = document.getElementById("auth-avatar-picker");
      if (picker) picker.hidden = false;
      const user = getSessionUser();
      if (avatarPreview) {
        avatarPreview.style.backgroundImage = user && user.photo ? `url('${user.photo}')` : "";
        avatarPreview.classList.toggle("has-image", Boolean(user && user.photo));
      }
      if (avatarHiddenData) avatarHiddenData.value = (user && user.photo) || "";
      if (avatarRemove) avatarRemove.hidden = !(user && user.photo);
    });
  }

  if (switchBtn) {
    switchBtn.addEventListener("click", () => {
      openAuthModal(authMode === "signup" ? "login" : "signup");
    });
  }

  if (authForm) authForm.addEventListener("submit", handleAuthSubmit);
  if (closeBtn) closeBtn.addEventListener("click", closeAuthModal);

  authModal.querySelectorAll("[data-auth-close]").forEach((overlay) => {
    overlay.addEventListener("click", closeAuthModal);
  });

  document.addEventListener("click", (e) => {
    if (accountMenu && !accountMenu.hidden && !e.target.closest("#account-menu") && !e.target.closest("#avatar-btn")) {
      closeAccountMenu();
    }
  });

  updateAvatar();
}

// Iyo urupapuro rwakangiye, iyi function itangira ibikorwa by'ubushakashatsi n'ikurikirana.
document.addEventListener("DOMContentLoaded", () => {
  console.log("=== CineVault Page Loaded ===");

  // Otesha ibihoraho bya modal
  setupModalHandlers();

  // Otesha ibikoresho bya Categories
  setupCategories();

  // Setup navigation for Home, Movies, TV Shows
  setupNavigation();

  // Setup watchlist
  setupWatchList();

  // Setup account / auth
  setupAccount();

  const searchInput = document.getElementById("search-input");

  if (searchInput) {
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        lastNavClick = null;
        const query = searchInput.value.trim();

        if (!query) {
          if (currentView === 'tvshows') {
            fetchTopTVShowTrailers();
          } else {
            fetchTopMovieTrailers();
          }
          return;
        }

        if (currentView === 'tvshows') {
          searchTVShowTrailers(query);
        } else {
          searchMovieTrailers(query);
        }
      }
    });
  }

  // Karuwamo trailers mbere - ibi bizashiraho kandi hero banner
  console.log("Loading trailers for hero banner...");
  fetchTopMovieTrailers();
});
