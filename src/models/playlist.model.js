import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
  playlistID: { type: String, required: true, unique: true },
  trackRankings: [{ trackID: String, trackRanking: Number }],
});

export const Playlist = mongoose.model("Playlist", playlistSchema);
