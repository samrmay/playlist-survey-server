import express from "express";
import test from "./test";

export default () => {
  const router = express.Router();
  test(router);

  return router;
};
