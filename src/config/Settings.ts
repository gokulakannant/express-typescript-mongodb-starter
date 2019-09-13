
const DB_HOST: string = process.env.DB_HOST || "127.0.0.1";
const DB_PORT: string | number = process.env.DB_PORT || 27017;
const DB_NAME: string = process.env.DB_NAME || "express-ts-mongodb-starter";
const DB_USER: string = process.env.DB_USER || "";
const DB_PASS: string = process.env.DB_PASS || "";
const DB_CRED: string = DB_USER.length > 0 || DB_PASS.length > 0 ? `${DB_USER}:${DB_PASS}@` : "";

const DB_URL: string = process.env.DB_URL || `mongodb://${DB_CRED}${DB_HOST}:${DB_PORT}/${DB_NAME}`;

export default {

    /* Api base url */
    apiBaseUrl: "http://localhost:3001/api/v1",

    /* Server listening port */
    apiListenPort: 3001,

    /* Mongodb connection url */
    mongodbServerUrl: DB_URL,

    /* Default smtp configurations */
    smtpServer: {
        host: "smtp.gmail.com",
        port: 587,
        secure: true,
        user: "",
        pass: "",
        fromName: "Admin Panel",
        fromAddress: ""
    },

    /* key to sign tokens */
    jwtSecretKey: "find-me-if-you-can",

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
    developerMode: true
};
