import { Db } from "mongodb";

/**
 * Adding static data for users collection
 *
 * @param db Mongodb instance
 */
const UsersSeeder = async (db: Db) => {
    const dataCollectionToInsert: Array<any> = [];
    for (let i = 1; i <= 50; i += 1) {
        dataCollectionToInsert.push({
            name: `Admin${i}`,
            email: `admin${i}@gmail.com`,
            password: "$2b$10$9E5vW6a86igjV0rFVi4hqu9bYKKdwXA92/UtqD4sMvAbsBIh2cNhG",
            is_active: "true",
            dob: new Date(),
            role: "Admin",
            mobile_number: 9876543210,
            date_updated: new Date()
        });
    }
    db.collection("users").insertMany(dataCollectionToInsert);
    return;
};

export default UsersSeeder;
