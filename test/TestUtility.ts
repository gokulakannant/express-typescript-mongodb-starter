import url from "url";
import { MongoClient, Db } from "mongodb";
import settings from "../src/config/Settings";

const mongodbConnection: string = settings.mongodbServerUrl;
const mongoPathName: string = url.parse(mongodbConnection).pathname;
const dbName: string = mongoPathName.substring(mongoPathName.lastIndexOf("/") + 1);

const CONNECT_OPTIONS = {
    reconnectTries: 3600,
    reconnectInterval: 1000,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

export const getDB = async () => {
    let db: Db;
    return new Promise((resolve, reject) => {
        MongoClient.connect(
            mongodbConnection,
            CONNECT_OPTIONS,
            (err, client) => {
                db = client.db(dbName);
                resolve(db);
            },
        );
    });
};
