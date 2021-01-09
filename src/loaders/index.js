import loadExpress from "./express.js";
import loadMongoose from "./mongoose.js";

export default async (app) => {
  require("dotenv").config();

  console.log("Loading express");
  loadExpress(app);
  console.log("Express loaded");

  console.log("Loading mongoose");
  loadMongoose();
  console.log("Mongoose Loaded");
};
