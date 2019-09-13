import url from "url";
import {
    MongoClient
} from "mongodb";
import settings from "../../config/Settings";
import addAdminUsersSeeder from "./AdminUserSeeder";

const mongodbConnection = settings.mongodbServerUrl;
const mongoPathName = url.parse(mongodbConnection).pathname;
const dbName = mongoPathName.substring(mongoPathName.lastIndexOf("/") + 1);

/**
 * Mongodb connect options
 */
const CONNECT_OPTIONS = {
    useNewUrlParser: true
};

/**
 * Self invoking method for inserting static responses
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
    } catch (e) {
        console.error(`MongoDB connection was failed. ${e.message}`);
        return;
    }

    try {
        await addAdminUsersSeeder(db);
    } catch (error) {
        console.info(error);
    }
    client.close();
})();
