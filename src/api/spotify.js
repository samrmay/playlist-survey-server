import express from "express";
import getRedirectURI from "../services/spotify";

const route = express.Router();

export default (router) => {
  router.use("/spotify", route);

  route.get("/authlink", async (req, res) => {
    return getRedirectURI();
  });
};
