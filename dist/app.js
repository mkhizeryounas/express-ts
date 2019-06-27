"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const response_builder_1 = __importDefault(require("./middlewares/response-builder"));
// Routes
const index_1 = __importDefault(require("./routes/index"));
// App config
const servePort = process.env.PORT || "5000";
const app = express_1.default();
// view engine setup
app.set("views", path_1.default.join(__dirname, "..", "views"));
app.set("view engine", "ejs");
app.use(morgan_1.default("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public")));
app.use(response_builder_1.default);
app.use(cors_1.default());
app.use("/", index_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.reply({ statusCode: 404 });
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    console.log("ERROR:", err);
    if (err.isJoi || err.hasOwnProperty("sqlMessage"))
        err.status = 422;
    res.reply({ data: err.message, statusCode: err.status || 500 });
});
app.listen(servePort, () => console.log("🚀 ", "Server running..."));
