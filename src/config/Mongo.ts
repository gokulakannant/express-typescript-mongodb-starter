import url from "url";
import { MongoClient, Db } from "mongodb";
import settings from "./Settings";

const mongodbConnection: string = settings.mongodbServerUrl;
const mongoPathName: string = url.parse(mongodbConnection).pathname;
const dbName: string = mongoPathName.substring(mongoPathName.lastIndexOf("/") + 1);

/**
 * Mongodb reconnect interval for auto reconnect
 */
const RECONNECT_INTERVAL: number = 1000;

/**
 * Mongodb connect options
 */
const CONNECT_OPTIONS = {
    reconnectTries: 3600,
    reconnectInterval: RECONNECT_INTERVAL,
    useNewUrlParser: true
};

/**
 * Error callback method of mongodb connection
 */
const onClose = () => {
    console.info("MongoDB connection was closed");
};

/**
 * Reconnect callback method of mongodb connection
 */
const onReconnect = () => {
    console.info("MongoDB reconnected");
};

/**
 * Exported db variable with mongodb instance
 */
export let db: Db = null;

/**
 * Method to execute the mongodb connect with given configurations
 */
const connectWithRetry = () => {
    MongoClient.connect(
        mongodbConnection,
        CONNECT_OPTIONS,
        (err, client) => {
            if (err) {
                console.error(
                    `MongoDB connection was failed: ${err.message}`,
                    err.message,
                );
                setTimeout(connectWithRetry, RECONNECT_INTERVAL);
            } else {
                db = client.db(dbName);
                db.on("close", onClose);
                db.on("reconnect", onReconnect);
                console.info("MongoDB connected successfully");
            }
        },
    );
};

connectWithRetry();
