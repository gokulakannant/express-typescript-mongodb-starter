import jwt from "jsonwebtoken";
import settings from "../config/Settings";

class TokenDetails {
    tokenLifeTime: number;
    payload: Object;
}

class Security {
    private static _instance: Security;

    /**
     * To get the instance of Security class
     */
    static getInstance(): Security {
        return this._instance || (this._instance = new Security());
    }

    /**
     * This method will return the allowed origins.
     *
     * @returns * (means all)
     */
    public getAccessControlAllowOrigin = (): Array<string> | string => {
        if (settings.developerMode) {
            return "*";
        }
        return [settings.clientBaseUrl, settings.adminBaseUrl];
    };

    /**
     * To validate the JWT token along with global jwtsecret key
     *
     * @param {string} token
     */
    public verifyJWTToken = (token: string): Promise<string | object> => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, settings.jwtSecretKey, (err, decodedToken) => {
                if (err || !decodedToken) {
                    reject(err);
                }

                resolve(decodedToken);
            });
        });
    };

    /**
     * Generate a new JWT token for logged in user
     *
     * @param {object} details
     * @returns {string} token
     */
    public createJWToken = (details = {}): string => {
        const tokenDetails: TokenDetails = new TokenDetails();

        if (typeof details === "object") {
            Object.assign({}, tokenDetails, details);
        }

        if (!tokenDetails.tokenLifeTime || typeof tokenDetails.tokenLifeTime !== "number") {
            tokenDetails.tokenLifeTime = 3600;
        }

        if (!tokenDetails.payload || typeof tokenDetails.payload !== "object") {
            tokenDetails.payload = {};
        }

        const token: string = jwt.sign({
            data: tokenDetails.payload
        }, settings.jwtSecretKey, {
            expiresIn: tokenDetails.tokenLifeTime,
            algorithm: "HS256"
        });

        return token;
    }
}

export default Security.getInstance();
