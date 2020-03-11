import { Response, NextFunction } from "express";
import security from "../helpers/Security";
import { buildErrorResponse } from "../helpers/ResponseBuilder";
import { AdminError, IExpressRequest } from "../types";

/**
 * Validate the jwt token for configured routes.
 *
 * @param { IExpressRequest } req
 * @param { Response } res
 * @param { NextFunction } next
 */
const validateJwtToken = (req: IExpressRequest, res: Response, next: NextFunction) => {
    let token: string = req.get("Authorization");

    if (typeof token === "string" && token.startsWith("Bearer ")) {
        token = token.substring(7);
    }

    security.verifyJWTToken(token)
        .then((decodedToken: any) => {
            req.user = decodedToken.data;
            next();
        })
        .catch((err: AdminError) => {
            const error = err;
            error.statusCode = 401;
            res.status(401).send(buildErrorResponse(error));
        });
};

export default {
    validateJwtToken
};
