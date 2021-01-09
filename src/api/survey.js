import express from "express";
import { getSurveyByPlaylist, deleteSurvey } from "../services/surveys";

const route = express.Router();

export default (router) => {
  router.use("/survey", route);

  route.get("/:spotifyId", async (req, res) => {
    const result = await getSurveyByPlaylist(spotifyId);
    const body = { playlist: result.playlist, error: result.error };
    return res.status(result.status).send(body);
  });

  route.delete("", async (req, res) => {
    const { id } = req.body;
    const { status, error } = await deleteSurvey(id);
    return res.status(status).send({ error });
  });
};
