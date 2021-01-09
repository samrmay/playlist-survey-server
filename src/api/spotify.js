import express from "express";
import {
  getRedirectURI,
  getUserInfo,
  getUserPlaylists,
  getAccessToken,
  getTrackById,
  getPlaylistById,
} from "../services/spotify";

const route = express.Router();

export default (router) => {
  router.use("/spotify", route);

  route.get("/authlink", (req, res) => {
    return res.status(200).send(getRedirectURI());
  });

  route.get("/user/info/:userAccessToken", async (req, res) => {
    const result = await getUserInfo(req.params.userAccessToken);
    console.log(result);
    if (result.error) {
      return res.status(404).send({ error: result.error, info: null });
    } else {
      return res.status(200).send({ error: null, info: result });
    }
  });

  route.get("/user/playlists/:userAccessToken", async (req, res) => {
    const result = await getUserPlaylists(req.params.userAccessToken);
    console.log(result);
    if (result.error) {
      return res.status(404).send({ error: result.error, playlists: null });
    } else {
      return res.status(200).send({ error: null, playlists: result });
    }
  });
};
