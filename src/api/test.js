import express from "express";

const route = express.Router();

export default (router) => {
  router.use("/test", route);

  route.get("/", async (req, res) => {
    res.status(200).send("Api online");
  });
};
