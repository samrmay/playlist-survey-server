import express from "express";
import { getPlaylistBySpotifyId, deletePlaylist } from "../services/playlists";

const route = express.Router();

export default (router) => {
  router.use("/playlist", route);

  route.get("/:spotifyId", async (req, res) => {
    const result = await getPlaylistBySpotifyId(spotifyId);
    const body = { playlist: result.playlist, error: result.error };
    return res.status(result.status).send(body);
  });

  route.delete("", async (req, res) => {
    const { id } = req.body;
    const { status, error } = await deletePlaylist(id);
    return res.status(status).send({ error });
  });
};
