import fetch from "node-fetch";

export function getRedirectURI() {
  let authURL = `${process.env.SPOTIFY_ACCOUNTS}authorize?client_id=${process.env.SPOTIFY_CLIENT_ID}`;
  const scopes = "scope=playlist-read-private&playlist-read-collaborative";
  const responseType = "response_type=code";
  const redirect = `redirect_uri=${process.env.REDIRECT_URI}`;
  authURL += `&${scopes}&${responseType}&${redirect}`;
  return { authURL };
}

export function getUserAccessToken(code) {
  const authString = getAuthString();

  return fetch(process.env.SPOTIFY_ACCOUNTS + "api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: authString,
    },
    body: `grant_type=authorization_code&code=${code}&redirect_uri=${process.env.REDIRECT_URI}`,
  }).then((response) => response.json());
}

export function getRefreshToken(refreshToken) {
  const authString = getAuthString();
  return fetch(process.env.SPOTIFY_ACCOUNTS + "api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: authString,
    },
    body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
  }).then((response) => response.json());
}

export function getUserInfo(userAccessToken) {
  return fetch(process.env.SPOTIFY_API + "me", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + userAccessToken,
    },
  }).then((response) => response.json());
}

export function getUserPlaylists(userAccessToken) {
  return fetch(process.env.SPOTIFY_API + "me/playlists", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + userAccessToken,
    },
  }).then((response) => response.json());
}

export function getAccessToken() {
  const authString = getAuthString();

  return fetch(process.env.SPOTIFY_ACCOUNTS + "api/token", {
    method: "POST",
    headers: {
      Authorization: authString,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  }).then((response) => {
    return response.json();
  });
}

export function getTrackById(id, token) {
  if (!id) {
    return null;
  }

  return fetch(process.env.SPOTIFY_API + `tracks/${id}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then((response) => response.json());
}

export function getPlaylistById(id, token) {
  if (!id) {
    return null;
  }
  return fetch(process.env.SPOTIFY_API + `playlists/${id}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then((response) => response.json());
}

export function getTrackIdsFromPlaylist(playlistId, userAccessToken) {
  if (!playlistId) {
    return null;
  }

  const url = process.env.SPOTIFY_API + "playlists/" + playlistId + "/tracks/?";

  return fetch(url + "fields=items(track(id))", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + userAccessToken,
    },
  }).then((response) => response.json());
}

export function getPlaylistTracks(id, token) {
  if (!id) {
    return null;
  }

  return fetch(
    process.env.SPOTIFY_API + "playlists/" + id + "/tracks?offset=0&limit=100",
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  ).then((response) => response.json());
}

function getAuthString() {
  return (
    "Basic " +
    Buffer.from(
      process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
    ).toString("base64")
  );
}
