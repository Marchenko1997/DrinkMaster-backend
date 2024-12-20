import express from 'express';
import logger from 'morgan';
import cors from 'cors';

import authRouter from "./routes/api/auth.js";
import usersRouter from "./routes/api/users.js";
import drinksRouter from "./routes/api/drinks.js";
import filtersRouter from "./routes/api/filters.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/drinks", drinksRouter);
app.use("/api/filters", filtersRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

export default app;
