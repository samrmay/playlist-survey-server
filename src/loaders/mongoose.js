import mongoose from "mongoose";

export default async () =>
  mongoose.connect(process.env.DB_URL, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
