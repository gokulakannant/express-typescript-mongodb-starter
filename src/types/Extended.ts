import { Request } from "express";

export interface IExpressRequest extends Request {
    /**
     * Added a one more property in express js request.
     * It is used to store the decoded jwt token data
     */
    user?: string;
}
