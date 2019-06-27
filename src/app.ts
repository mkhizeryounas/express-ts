import express, { Application, Request, Response, NextFunction } from "express";
import path from "path";
import logger from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import responseBuilder from "./middlewares/response-builder";
// Routes
import indexRouter from "./routes/index";

// App config
const servePort: string = process.env.PORT || "5000";
const app: Application = express();

// view engine setup
app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(responseBuilder);
app.use(cors());

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.reply({ statusCode: 404 });
});

// error handler
app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  console.log("ERROR:", err);
  if (err.isJoi || err.hasOwnProperty("sqlMessage")) err.status = 422;
  res.reply({ data: err.message, statusCode: err.status || 500 });
});

app.listen(servePort, () =>
  console.log("🚀 ", `Server running on port ${servePort}.`)
);
