import { Db } from "mongodb";
import logger from "../../helpers/Logger";

const COLLECTION_NAME = "users";
/**
 * Add static users for super admin
 *
 * @param db Mongodb instance
 */
const insertInitialUser = async (db: Db) => {
    const hasDocuments = await db
        .collection(COLLECTION_NAME)
        .countDocuments({});

    if (hasDocuments === 0) {
        try {
            await db.collection(COLLECTION_NAME).insertOne({
                name: "Super Admin",
                email: "admin@gmail.com",
                password: "$2b$10$9E5vW6a86igjV0rFVi4hqu9bYKKdwXA92/UtqD4sMvAbsBIh2cNhG",
                is_active: "true",
                dob: new Date(),
                role: "Admin",
                mobile_number: 9876543210,
                date_updated: new Date()
            });
        } catch (error) {
            logger.error(JSON.stringify(error));
        }
    }
};

/**
 * Create admin_users collections with bson validator
 *
 * @param db Mongodb instance
 */
const UsersMigration = async (db: Db) => {
    try {
        await db.createCollection(COLLECTION_NAME);
    } catch (error) {
        logger.error("User collection Migration got error");
        logger.error(JSON.stringify(error));
    }
    await insertInitialUser(db);
};

export {
    insertInitialUser,
    UsersMigration
};
