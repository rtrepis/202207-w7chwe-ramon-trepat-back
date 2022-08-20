import express from "express";
import morgan from "morgan";
import cors from "cors";
import { generalError, notFoundError } from "./middlewares/errors";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(notFoundError);
app.use(generalError);

export default app;
