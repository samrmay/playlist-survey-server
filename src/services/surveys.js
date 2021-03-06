import { Survey } from "../models/survey.model";
import {
  getPlaylistById,
  getUserInfo,
  getTrackIdsFromPlaylist,
  reorderPlaylistItems,
  getRefreshToken,
} from "./spotify";
import getReorderSteps from "./reorder";

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

export async function getSurveyById(id) {
  const result = await Survey.findById(id);

  let error = null;
  let status = 200;
  if (!result) {
    error = "Survey with that id does not exist";
    status = 404;
  }
  return { survey: result, error, status };
}

export async function putSurveyRankings(id, rankings) {
  const survey = await Survey.findById(id);
  if (!survey) {
    return { status: 404, survey: null, error: "Survey could not be found" };
  }
  // Iterate through rankings, add points from each item
  const modelRankings = survey.trackRankings;
  for (let i in rankings) {
    const id = rankings[i]._id;
    const index = modelRankings.findIndex((item) => item._id == id);
    modelRankings[index].trackRanking += rankings[i].points;
  }

  // Sort by ranking
  const unsorted = [...modelRankings];
  survey.trackRankings = modelRankings.sort(
    (a, b) => b.trackRanking - a.trackRanking
  );
  survey.save();

  // Update spotify playlist with track ranking order
  await updateSpotifyPlaylist(unsorted, survey);

  return { survey, error: null, status: 201 };
}

async function updateSpotifyPlaylist(oldRankings, document) {
  const { refreshToken, trackRankings, playlistSpotifyId } = document;
  const callArr = getReorderSteps(oldRankings, trackRankings);
  const tokenResponse = await getRefreshToken(refreshToken);
  const token = tokenResponse.access_token;

  const playlist = await getPlaylistById(playlistSpotifyId, token);
  let { snapshot_id } = playlist;

  for (let i in callArr) {
    const { rangeStart, rangeLength, insertBefore } = callArr[i];
    const snapResponse = await reorderPlaylistItems(
      playlistSpotifyId,
      token,
      rangeStart,
      rangeLength,
      insertBefore,
      snapshot_id
    );
    snapshot_id = snapResponse.snapshot_id;
  }
  return null;
}

export async function postSurvey(
  name,
  playlistId,
  userAccessToken,
  refreshToken
) {
  const playlist = await getPlaylistById(playlistId, userAccessToken);
  const user = await getUserInfo(userAccessToken);

  if (!user) {
    return null;
  }
  if (!playlist) {
    return null;
  }

  const trackIds = await getTrackIdsFromPlaylist(playlistId, userAccessToken);
  const trackRankingObj = trackIds.items.map((item) => {
    return {
      trackSpotifyId: item.track.id,
      trackRanking: 0,
    };
  });

  const newSurvey = await new Survey({
    name,
    playlistSpotifyId: playlistId,
    owner: user.display_name,
    trackRankings: trackRankingObj,
    refreshToken,
  });
  if (newSurvey) {
    newSurvey.save();
    return { survey: newSurvey, error: null, status: 201 };
  }
  return { survey: null, error: "Resource could not be created", status: 409 };
}

export async function deleteSurvey(id) {
  const deleted = await Survey.findByIdAndDelete(id);
  if (deleted) {
    return { error: null, status: 204 };
  } else {
    return { error: "Could not be deleted (may not exist)", status: 409 };
  }
}

export async function getTopSurveys() {
  const surveys = await Survey.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .select("-trackRankings");
  if (!surveys) {
    return { status: 404, error: "surveys not found", surveys: null };
  }
  return { status: 200, error: null, surveys };
}
