import mongoose from "mongoose";

const surveySchema = new mongoose.Schema({
  name: String,
  // Owner is spotify user id
  owner: String,
  playlistSpotifyId: { type: String, required: true },
  trackRankings: [{ trackSpotifyId: String, trackRanking: Number }],
  refreshToken: { type: String, required: true },
});

export const Survey = mongoose.model("Survey", surveySchema);
