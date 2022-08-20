import "./loadEnvironment";
import connectDB from "./database";
import startServer from "./server/startServer";

const port = +process.env.PORT || 4931;

const mongoURL = process.env.MONGO_URI;

(async () => {
  try {
    await connectDB(mongoURL);
    await startServer(port);
  } catch (error) {
    process.exit(1);
  }
})();
