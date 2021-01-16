import express from "express";
import {
  getRedirectURI,
  getUserInfo,
  getUserPlaylists,
  getAccessToken,
  getTrackById,
  getPlaylistById,
  getPlaylistTracks,
  getUserAccessToken,
  getRefreshToken,
} from "../services/spotify";

const route = express.Router();

export default (router) => {
  router.use("/spotify", route);

  route.get("/authlink", (req, res) => {
    return res.status(200).send(getRedirectURI());
  });

  route.get("/user/accesstoken/:code", async (req, res) => {
    const { code } = req.params;
    const result = await getUserAccessToken(code);
    if (result.error) {
      return res
        .status(404)
        .send({ error: result.error, accessToken: null, refreshToken: null });
    }
    return res.status(200).send({
      error: null,
      accessToken: result.access_token,
      refreshToken: result.refresh_token,
    });
  });

  route.get("/user/refreshtoken/:refreshToken", async (req, res) => {
    const { refreshToken } = req.params;
    const result = await getRefreshToken(refreshToken);
    console.log(result);
    if (result.access_token) {
      return res.status(200).send({ error: null, token: result.access_token });
    }
    return res.status(404).send({ error: result.error, token: null });
  });

  route.get("/user/info/:userAccessToken", async (req, res) => {
    const result = await getUserInfo(req.params.userAccessToken);
    if (result.error) {
      return res.status(404).send({ error: result.error, info: null });
    } else {
      return res.status(200).send({ error: null, info: result });
    }
  });

  route.get("/user/playlists/:userAccessToken", async (req, res) => {
    const result = await getUserPlaylists(req.params.userAccessToken);
    if (result.error) {
      return res.status(404).send({ error: result.error, playlists: null });
    } else {
      return res.status(200).send({ error: null, playlists: result });
    }
  });

  route.get("/tracks/:id", async (req, res) => {
    const token = await getAccessToken();
    const result = await getTrackById(req.params.id, token);

    if (result.track) {
      return res.status(200).send({ error: null, track: result.track });
    }
  });

  route.get("/playlist/tracks/:id", async (req, res) => {
    const token = await getAccessToken();
    const result = await getPlaylistTracks(req.params.id, token.access_token);

    return res.status(200).send({ error: null, tracks: result });
  });

  route.get("/playlist/:id", async (req, res) => {
    const token = await getAccessToken();
    const result = await getPlaylistById(req.params.id, token.access_token);
    if (result.id) {
      return res.status(200).send({ error: null, playlist: result });
    }
    return res.status(409).send({ error: result.error, playlist: null });
  });
};
