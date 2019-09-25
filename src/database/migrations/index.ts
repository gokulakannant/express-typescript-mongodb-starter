import url from "url";
import { MongoClient } from "mongodb";
import settings from "../../config/Settings";
import logger from "../../helpers/Logger";
import { UsersMigration } from "./UserMigration";

const mongodbConnection = settings.mongodbServerUrl;
const mongoPathName = url.parse(mongodbConnection).pathname;
const dbName = mongoPathName.substring(mongoPathName.lastIndexOf("/") + 1);

/**
 * Mongodb connect options
 */
const CONNECT_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

/**
 * Self invoke method for database migrations
 */
(async () => {
    let client = null;
    let db = null;

    try {
        client = await MongoClient.connect(
            mongodbConnection,
            CONNECT_OPTIONS
        );
        db = client.db(dbName);
        logger.info(`Successfully connected to ${mongodbConnection}`);
    } catch (e) {
        logger.error(`MongoDB connection was failed. ${e.message}`);
        return;
    }

    await UsersMigration(db);
    client.close();
})();
