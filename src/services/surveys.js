import { Survey } from "../models/survey.model";
import { getPlaylistById, getUserInfo } from "./spotify";

export async function getSurveyByPlaylist(PlaylistSpotifyId) {
  const result = await Survey.findOne({ PlaylistSpotifyId });

  let error = null;
  let status = 200;
  if (!result) {
    error = "Survey with that playlist does not exist";
    status = 404;
  }
  return { survey: result, error, status };
}

export async function postSurvey(name, playlistId, userAccessToken) {
  const playlist = await getPlaylistById(playlistId, userAccessToken);
  const user = await getUserInfo(userAccessToken);

  if (!user) {
    return null;
  }
  if (!playlist) {
    return null;
  }

  console.log(playlist, user);
  return null;
}

export async function deleteSurvey(id) {
  const deleted = await Survey.findByIdAndDelete(id);
  if (deleted) {
    return { error: null, status: 204 };
  } else {
    return { error: "Could not be deleted (may not exist)", status: 409 };
  }
}
