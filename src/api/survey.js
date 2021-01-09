import express from "express";
import {
  getSurveyByPlaylist,
  getSurveyById,
  postSurvey,
  deleteSurvey,
} from "../services/surveys";

const route = express.Router();

export default (router) => {
  router.use("/survey", route);

  route.get("/search/:spotifyId", async (req, res) => {
    const result = await getSurveyByPlaylist(spotifyId);
    const body = { survey: result.survey, error: result.error };
    return res.status(result.status).send(body);
  });

  route.get("/:id", async (req, res) => {
    const result = await getSurveyById(req.params.id);
    const body = { survey: result.survey, error: result.error };
    return res.status(result.status).send(body);
  });

  route.post("/", async (req, res) => {
    const { name, playlistId, userAccessToken } = req.body;
    const result = await postSurvey(name, playlistId, userAccessToken);
    const body = { survey: result.survey, error: result.error };
    return res.status(result.status).send(body);
  });

  route.delete("/:id", async (req, res) => {
    const { status, error } = await deleteSurvey(req.params.id);
    return res.status(status).send({ error });
  });
};
