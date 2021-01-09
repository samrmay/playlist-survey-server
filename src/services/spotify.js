import fetch from "node-fetch";

export function getRedirectURI() {
  let authURL = `${process.env.SPOTIFY_ACCOUNTS}authorize?client_id=${process.env.SPOTIFY_CLIENT_ID}`;
  const scopes = "scope=playlist-read-private&playlist-read-collaborative";
  const responseType = "response_type=token";
  const redirect = `redirect_uri=${process.env.REDIRECT_URI}`;
  authURL += `&${scopes}&${responseType}&${redirect}`;
  return { authURL };
}

export function getUserId(userAccessToken) {
  return fetch(process.env.SPOTIFY_API + "me", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + userAccessToken,
    },
  }).then((response) => response.json());
}

export function getAccessToken() {
  const authString =
    "Basic " +
    Buffer.from(
      process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
    ).toString("base64");

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

export function getPlaylistById(id, userAccessToken) {
  if (!id) {
    return null;
  }

  return fetch(process.env.SPOTIFY_API + `playlists/${id}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + userAccessToken,
    },
  }).then((response) => response.json());
}
