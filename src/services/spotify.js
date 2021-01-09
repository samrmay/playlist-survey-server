import fetch from "node-fetch";

export function getRedirectURI() {
  let authURL = `${process.env.SPOTIFY_ACCOUNTS}authorize?client_id=${process.env.SPOTIFY_CLIENT_ID}`;
  const scopes = "scope=playlist-read-private";
  const responseType = "response_type=token";
  const redirect = `redirect_uri=${process.env.REDIRECT_URI}`;
  authURL += `&${scopes}&${responseType}&${redirect}`;
  return { authURL };
}
