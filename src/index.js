import express from "express";
import loadApp from "./loaders";

const app = express();

async function startServer() {
  await loadApp(app);

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));
}

startServer();
