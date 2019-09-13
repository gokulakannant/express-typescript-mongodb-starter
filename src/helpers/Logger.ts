import winston from "winston";
import fs from "fs";
import path from "path";
import { Response, Request, NextFunction } from "express";
import { buildErrorResponse } from "./ResponseBuilder";
import { CustomError } from "../types/General";
import Utils from "./Utils";

class Logger {
    private static _instance: Logger;
    private static LOGS_DIR: string = path.normalize(path.join(process.cwd(), path.join("storage", "log" )));
    private _logger: winston.Logger;

    constructor() {
        this.registerWinstonInstance();
    }

    /**
     * To get the logger instance
     * @returns {Logger}
     */
    static getInstance(): Logger {
        return this._instance || (this._instance = new Logger());
    }

    /**
     * Winston logger console and file configuration options
     * @returns {Object}
     */
    static loggerOptions() {
        return {
            console: {
                level: "debug",
                handleExceptions: true,
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple()
                )
            },
            file: {
                filename: path.join(Logger.LOGS_DIR, "server.log")
            }
        };
    }

    get logger(): winston.Logger {
        return this._logger;
    }

    /**
     * Create the log file if it is not exists
     * Then, creating a winston instance for the app
     * Assing the winslon logger instance to javascript console
     * @returns {void}
     */
    private registerWinstonInstance() {
        if (!fs.existsSync(Logger.LOGS_DIR)) {
            fs.mkdirSync(Logger.LOGS_DIR, "0777");
        }

        this._logger = winston.createLogger({
            format: winston.format.combine(
                winston.format.splat(),
                winston.format.simple()
            ),
            transports: [
                new winston.transports.Console(Logger.loggerOptions().console),
                new winston.transports.File(Logger.loggerOptions().file)
            ]
        });

        // Assign the winston logger for javascript console.
        // Why because, We no need to import the logger class anywhere in the project
        console.log = this._logger.info;
        console.error = this._logger.error;
        console.debug = this._logger.debug;
    }

    /**
     * Method for caught the throwed exceptions and error over the application.
     *
     * @param {object} err
     * @param {object} req
     * @param {object} res
     * @param {method} next
     */
    public logAppErrors(err: CustomError, req: Request, res: Response, next: NextFunction) {
        if (err) {
            res.status(err.statusCode || 500);
            res.send(buildErrorResponse(err));
            console.error(err.stack);
            /** This line is not so important. The request will automatically proceed next req */
            next();
        }

        console.error(`StatusCode :: ${err.statusCode || 500}
                       Message :: ${err.message}
                       Url :: ${req.originalUrl}
                       Method :: ${req.method}
                       Ip :: ${req.ip}
                       Time :: ${Utils.tsFormat()}`);

        /* res.on("finish", () => {
            winston.info(`Status code :: ${res.statusCode} ==> ErrorMessage ${res.statusMessage}; ==>
                Content Size ${res.get("Content-Length") || 0}b sent`)
         })
         */
    }
}

export default Logger.getInstance();
