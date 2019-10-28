
import dotenv from "dotenv";
dotenv.config();
import utils from "../helpers/Utils";

const DB_HOST: string = process.env.DB_HOST || "127.0.0.1";
const DB_PORT: number = Number(process.env.DB_PORT) || 27017;
const DB_NAME: string = process.env.DB_NAME || "express-ts-mongodb-starter";
const DB_USER: string = process.env.DB_USER || "";
const DB_PASS: string = process.env.DB_PASS || "";
const DB_CRED: string = DB_USER.length > 0 || DB_PASS.length > 0 ? `${DB_USER}:${DB_PASS}@` : "";

const DB_URL: string = process.env.DB_URL || `mongodb://${DB_CRED}${DB_HOST}:${DB_PORT}/${DB_NAME}`;

export default {

    /* Api base url */
    apiBaseUrl: process.env.API_BASE_URL || "http://localhost:3001/api/v1",

    /* Server listening port */
    apiListenPort: process.env.API_LISTENING_PORT || 3001,

    /* Mongodb connection url */
    mongodbServerUrl: DB_URL,

    /* Access control allowed origin */
    clientBaseUrl: process.env.CLIENT_BASE_URL || "http://localhost:3000",
    adminBaseUrl: (process.env.API_BASE_URL) ? new URL(process.env.API_BASE_URL).origin : "http://localhost:3001",

    /* Default smtp configurations */
    smtpServer: {
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT) || 587,
        secure: utils.isTrueSet(process.env.SMTP_SECURE),
        user: process.env.SMTP_USER || "",
        pass: process.env.SMTP_PASS || "",
        fromName: process.env.SMTP_FROM_NAME || "Admin Panel",
        fromAddress: process.env.SMTP_FROM_ADDRESS || ""
    },

    /* key to sign tokens */
    jwtSecretKey: process.env.JWT_SECRET_KEY || "find-me-if-you-can",

    cookieSecretKey: "-",

    /* Base storage url */
    storageUrl: "storage/",

    /** Path to generated technical documentation url */
    techDocConfig: {
        endPoint: "/technical-document",
        url: "Documentation/"
    },

    /** Path to generated test report url */
    testReportConfig: {
        endPoint: "/test-report",
        url: "TestReport/"
    },

    /* Temporary storage for assets operations */
    tempStoragePath: "storage/temp/",

    /* Mode of server running */
    developerMode: utils.isTrueSet(process.env.DEVELOPER_MODE)
};
