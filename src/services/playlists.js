import { Playlist } from "../models/playlist.model";

export async function getPlaylistBySpotifyId(spotifyId) {
  const result = await Playlist.findOne({ spotifyId });

  let error = null;
  let status = 200;
  if (!result) {
    error = "Playlist does not exist";
    status = 404;
  }
  return { playlist: result, error, status };
}

export async function postPlaylist(spotifyID) {
  return null;
}

export async function deletePlaylist(id) {
  const deleted = Playlist.findByIdAndDelete(id);
  if (deleted) {
    return { error: null, status: 204 };
  } else {
    return { error: "Could not be deleted (may not exist)", status: 409 };
  }
}
