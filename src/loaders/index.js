import loadExpress from "./express.js";

export default async (app) => {
  console.log("Loading express");
  loadExpress(app);
  console.log("Express loaded");
};
