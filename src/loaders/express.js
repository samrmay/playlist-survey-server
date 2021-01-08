import express from "express";
import routes from "../api";

export default (app) => {
  app.use(express.json());
  app.use("/api", routes());
};
