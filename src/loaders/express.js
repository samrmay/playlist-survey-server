import express from "express";
import cors from "cors";
import routes from "../api";

export default (app) => {
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
    })
  );

  app.use(express.json());
  app.use("/api", routes());
};
