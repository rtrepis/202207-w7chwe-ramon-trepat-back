import "./loadEnvironment";
import connectDB from "./database";

import startServer from "./server/startServer";

let port = +process.env.PORT || 4931;

let mongoURL = process.env.MONGODB_URL;

(async () => {
  try {
    await connectDB(mongoURL);
    await startServer(port);
  } catch (error) {
    process.exit(1);
  }
})();
