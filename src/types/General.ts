
import { Router, Request, Response, NextFunction } from "express";

export abstract class BaseRoute {
    /**
     * The `index` method is basically send the collection data based on given Filter options.
     *
     * @param req Request
     * @param res Response
     * @param next NextFunction
     * @returns void
     */
    index(req: Request, res: Response, next: NextFunction): void {}
    /**
     * The `store` method is commonly used to store the data which is received from the add forms
     *
     * @param req Request
     * @param res Response
     * @param next NextFunction
     * @returns void
     */
    store(req: Request, res: Response, next: NextFunction): void {}
    /**
     * The `update` method is commonly used to update the particuler document and return void
     *
     * @param req Request
     * @param res Response
     * @param next NextFunction
     * @returns void
     */
    update(req: Request, res: Response, next: NextFunction): void {}
    /**
     * The `delete` method is defined for delete the array of documents and returns void
     *
     * @param req Request
     * @param res Response
     * @param next NextFunction
     * @returns void
     */
    delete(req: Request, res: Response, next: NextFunction): void {}
    /**
     * The `export` method is defined for export the collection documents based on given filter options
     * It is a optional method.
     *
     * @param req Request
     * @param res Response
     * @param next NextFunction
     * @returns void
     */
    export?(req: Request, res: Response, next: NextFunction): void {}
}

export interface IFileInfo {
    /**
     * Denotes the file name
     */
    file: string;
    /**
     * Denotes the file size in the number format
     */
    size: number;
}

export class AdminError extends Error {
    /**
     * Denotes status code of an error
     */
    public statusCode: number = 500;
    /**
     * Denotes the message of the error
     */
    public message: string;
    /**
     * Error class generating time for logging purpose
     */
    public timestamp: number;
    /**
     * To construct the AdminError class with given message and error code
     *
     * @param errMessage Error message
     * @param code Optional parameter to receiving the error code
     */
    constructor(errMessage: string, code?: number) {
        super();
        this.message = errMessage;
        this.statusCode = code;
        this.timestamp = Date.now();
    }
}

export class SmtpAuth  {
    /**
     * Denotes smpt mailer username
     */
    user: string;
    /**
     * Denotes smtp password
     */
    pass: any;
}

export class SmptInfo {
    /**
     * Smpt hostname
     */
    host: string;
    /**
     * Smpt dns port
     */
    port: number;
    /**
     * Denotes wheather it is a secure connection or not
     * If port is 465 means `true`, otherwise `false`
     */
    secure: boolean;
    /**
     * Auth info of the smpt server
     */
    auth: SmtpAuth;
}

export class ApiResponse {
    data: any;
    message: string;
}
