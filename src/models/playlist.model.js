import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
  spotifyID: { type: String, required: true, unique: true },
  trackRankings: [{ trackID: String, trackRanking: Number }],
});

export const Playlist = mongoose.model("Playlist", playlistSchema);
