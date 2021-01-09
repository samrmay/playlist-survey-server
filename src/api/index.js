import express from "express";
import survey from "./survey";
import spotify from "./spotify";

export default () => {
  const router = express.Router();

  survey(router);
  spotify(router);

  return router;
};
