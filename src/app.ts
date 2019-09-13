import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import swagger from "swagger-ui-express";
import jsyaml from "js-yaml";
import fs from "fs";
import path from "path";
import logger from "./helpers/Logger";
import security from "./helpers/Security";
import routers from "./apiRouter";
import settings from "./config/Settings";

/** Creating express instance */
const app = express();

/** Add proxy ip if you have for load balancing */
app.set("trust proxy", 1);

/** Helmet helps you secure your Express apps by setting various HTTP headers. */
app.use(helmet());

/** Header configurations */
app.all("*", (req, res, next) => {
    // CORS headers
    res.header(
        "Access-Control-Allow-Origin",
        security.getAccessControlAllowOrigin()
    );
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Headers",
        "*"
    );
    if ("OPTIONS" === req.method) {
        res.send(200);
    } else {
        next();
    }
});

app.disable("x-powered-by");

/** Parse the post method body field as a json */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/** Load swagger ui */
const spec = fs.readFileSync(path.join(__dirname, "config/yaml/Swagger.yaml"), "utf8");
const swaggerDoc = jsyaml.safeLoad(spec);
app.use("/api-docs", swagger.serve, swagger.setup(swaggerDoc));

/** Serve the static contents */
app.use("/storage", express.static(settings.storageUrl));
app.use(settings.techDocConfig.endPoint, express.static(settings.techDocConfig.url));
app.use(settings.testReportConfig.endPoint, express.static(settings.testReportConfig.url));

/** Register the app routers */
app.use("/api", routers.openRouter);
app.use("/api", routers.privateRouter);

/** Global exception handler */
app.use(logger.logAppErrors);

app.set("port", settings.apiListenPort);

export default app;
