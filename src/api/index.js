import express from "express";
import playlist from "./playlist";
import spotify from "./spotify";

export default () => {
  const router = express.Router();

  router(playlist);
  router(spotify);

  return router;
};
