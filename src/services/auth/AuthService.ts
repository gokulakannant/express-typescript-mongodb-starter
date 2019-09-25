import bcrypt from "bcrypt";
import { ObjectID, ObjectId } from "mongodb";
import { db } from "../../config/Mongo";
import utils from "../../helpers/Utils";
import security from "../../helpers/Security";
import mailer from "../../helpers/Mailer";
import logger from "../../helpers/Logger";
import { IUserInfo, GridRequest, GridResponse, Filter, Sort, LoginResponse, AdminError } from "../../types";

const COLLECTION_NAME = "users";
class AuthService {
    /**
     * Format a input as like IAdminInfo interface for manipulating the data
     *
     * @param data is a type of IAdminInfo
     */
    private getValidDocumentForUpdate(data: IUserInfo): IUserInfo {
        const admin = <IUserInfo>{
            date_updated: new Date()
        };

        if (data.name !== undefined) {
            admin.name = utils.getString(data.name);
        }

        if (data.email !== undefined) {
            admin.email = utils.getString(data.email).toLowerCase();
        }

        if (data.password !== undefined) {
            admin.password = utils.getString(data.password);
        }

        if (data.is_active !== undefined) {
            admin.is_active = utils.getString(data.is_active);
        }

        if (data.dob !== undefined) {
            admin.dob = utils.getDateIfValid(data.dob);
        }

        if (data.mobile_number !== undefined) {
            admin.mobile_number = utils.getNumberIfPositive(data.mobile_number);
        }

        if (data.role !== undefined) {
            admin.role = utils.getString(data.role);
        }

        if (data.about_me !== undefined) {
            admin.about_me = utils.getString(data.about_me);
        }

        return admin;
    }

    /**
     * Get the correct sort object from the given input
     *
     * @param object Sort
     */
    private getSortableObject(object: Sort) {
        let order = 1;
        if (object.order !== "" && object.order === "desc") {
            order = -1;
        }
        return {
            [object.orderBy]: order
        };
    }

    /**
     * Get the filter object from the given input
     *
     * @param params GridRequest
     */
    private getFilter(params: GridRequest): Filter {
        const filter = <Filter>{};

        if (params.filter.is_active !== undefined) {
            filter.is_active = params.filter.is_active;
        }

        if (params.filter.roles !== undefined && params.filter.roles.length > 0) {
            filter.role = {
                $in: params.filter.roles
            };
        }

        if (params.filter.startDate !== undefined && params.filter.endDate !== undefined
            && params.filter.startDate !== null && params.filter.endDate !== null) {
            filter.dob = {
                $gte: new Date(params.filter.startDate),
                $lt: new Date(params.filter.endDate)
            };
        }

        if (params.search_query !== undefined) {
            (<any>filter).$or = [
                { email: new RegExp(params.search_query, "i") },
                { mobile_number: Number(params.search_query) },
                { name: new RegExp(params.search_query, "i") }
            ];
        }

        return filter;
    }

    /**
     * Get the records from the database from the given param
     * The params having the filter, sorting and paginating inputs
     *
     * @param params
     * @returns GridResponse
     */
    public async index(params: GridRequest): Promise<GridResponse> {
        let sort = {};
        const filter: Filter = this.getFilter(params);
        const limit: number = utils.getNumberIfPositive(params.row_per_page) || 5;
        const offset: number = utils.getNumberIfPositive(params.row_per_page * params.page) || 0;
        if (params.sort !== undefined) {
            sort = this.getSortableObject(params.sort);
        }
        return Promise.all([
            db.collection(COLLECTION_NAME)
                .find(filter)
                .sort(sort)
                .skip(offset)
                .limit(limit)
                .project({
                    password: 0,
                    date_updated: 0
                })
                .toArray(),
            db.collection(COLLECTION_NAME).countDocuments(filter)
        ]).then(([customers, customersCount]) => {
            const result: GridResponse = {
                total_count: customersCount,
                data: customers
            };
            return result;
        });
    }

    /**
     * Store the data into database
     *
     * @param data IAdminInfo
     * @returns Boolean
     */
    public store(data: IUserInfo): Promise<boolean | void> {
        return new Promise(async (resolve, reject) => {
            if (Object.keys(data).length === 0) {
                reject(new AdminError("Required fields are missing.", 500));
            }
            const saltRounds = 10;
            const admin: IUserInfo = this.getValidDocumentForUpdate(data);

            const usersCount = await db.collection(COLLECTION_NAME)
                                        .countDocuments({
                                            email: admin.email
                                        });

            if (usersCount > 0) {
                reject(new AdminError("This user is already registered.", 422));
            }

            if (admin.password === undefined) {
                admin.password = utils.getSecurePassword();
                this.sendPassword(admin);
            }

            if (admin.password && admin.password.length >= 6) {
                admin.password = bcrypt.hashSync(admin.password, saltRounds);
            } else {
                reject(new AdminError("Password should have atleast 6 digits.", 422));
            }

            await db
                .collection(COLLECTION_NAME)
                .insertMany([admin]);
            resolve();
        });
    }

    sendPassword(data: IUserInfo): void {
        mailer.send({
            to: data.email,
            subject: "Admin Panel Registeration",
            html: this.parseRegisterationMailTmpl(data)
        });
    }

    parseRegisterationMailTmpl(data: IUserInfo): string {
        const tmpl: string = AuthService.getRegisterUserEmailTmpl()
                                        .replace("{{username}}", data.name)
                                        .replace("{{password}}", data.password);
        logger.log(data.email);
        logger.log(data.password);
        return tmpl;
    }

    /**
     * Update the existing record in the database with the given updated data
     *
     * @param id adminId
     * @param data IAdminInfo
     */
    public update(id: string, data: IUserInfo): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            if (!ObjectID.isValid(id)) {
                reject(new AdminError("Invalid identifier"));
            }

            const customerObjectID = new ObjectID(id);
            const admin = this.getValidDocumentForUpdate(data);

            if (admin.email && admin.email.length > 0) {
                const customerCount = await db.collection(COLLECTION_NAME)
                                                .countDocuments({
                                                    _id: {
                                                        $ne: customerObjectID
                                                    },
                                                    email: admin.email
                                                });

                if (customerCount > 0) {
                    reject(new AdminError("Customer email must be unique"));
                }
            }

            try {
                await db.collection(COLLECTION_NAME)
                        .updateOne(
                            { _id: customerObjectID},
                            { $set: admin}
                        );
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * To delete the existing record in the database with given admin user id's
     *
     * @param removableIds adminId collection
     */
    public delete(removableIds: Array<string>): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const idCollection: Array<ObjectId> = [];
            for (const instance of removableIds) {
                if (!ObjectID.isValid(instance)) {
                    reject(new AdminError("Invalid identifier"));
                }
                idCollection.push(new ObjectID(instance));
            }
            const deleteResponse = await db.collection(COLLECTION_NAME)
                                            .deleteMany({
                                                _id: {
                                                    $in: idCollection
                                                }
                                            });
            (deleteResponse.deletedCount > 0) ? resolve(true) : reject(new AdminError("Unable to detele the admin."));
        });
    }

    /**
     * Get the particular admin user id from the parameter and returns a IAdminInfo details.
     *
     * @param id admin user id
     */
    public async getUserById<T>(id: string): Promise<T> {
        if (!ObjectID.isValid(id)) {
            return Promise.reject(new AdminError("Invalid identifier"));
        }
        const singleUser = await db.collection(COLLECTION_NAME)
                                    .find({ _id: new ObjectID(id)})
                                    .project({
                                        password: 0,
                                        date_updated: 0
                                    })
                                    .toArray();
        return (singleUser.length > 0 ? utils.head(singleUser) : {});
    }

    /**
     * This is a login method for check the user is existing in the database.
     * If credentials correct means, returns ILoginResponse. Otherwise returns false
     *
     * @param payload IAdminIngo
     * @returns ILoginInfo
     */
    public login(payload: IUserInfo): Promise<LoginResponse> {
        return new Promise(async (resolve, reject) => {
            if (Object.keys(payload).length === 0 || !payload.email
                || !payload.password) {
                return reject(new AdminError("Required fields are missing.", 500));
            }
            let user: any = await db.collection(COLLECTION_NAME)
                                    .find({ email: payload.email })
                                    .toArray();
            if (user.length > 0) {
                user = utils.head(user);
            } else {
                return reject(new AdminError("Authendication failed", 401));
            }
            const result = await bcrypt.compareSync(payload.password, user.password);
            if (result) {
                const response = new LoginResponse();
                response.authId = user._id;
                response.name = user.name;
                response.token = security.createJWToken({
                    payload,
                    tokenLifeTime: 2500
                });
                resolve(response);
            } else {
                reject(new AdminError("Authendication failed", 401));
            }
        });
    }

    private static getRegisterUserEmailTmpl(): string {
        /* tslint:disable */
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>New User</title>
        </head>
        <body>
            <table style="min-width:348px" width="100%" height="100%" cellspacing="0" cellpadding="0" border="0">
                <tbody>
                    <tr height="32px"></tr>
                    <tr align="center">
                        <td>
                            <div>
                                <div></div>
                            </div>
                            <table style="padding-bottom:20px;max-width:600px;min-width:220px"
                            cellspacing="0" cellpadding="0" border="0">
                                <tbody>
                                    <tr>
                                        <td>
                                            <table cellspacing="0" cellpadding="0">
                                                <tbody>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            <table style="direction:ltr;padding-bottom:7px"
                                                                width="100%" cellspacing="0"
                                                                cellpadding="0" border="0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td align="left">Admin Panel</td>
                                                                        <td style="font-family:Roboto-Light,Helvetica,Arial,sans-serif"
                                                                        align="right">{{username}}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td style="background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAIAAABvrngfAAAAA3NCSVQICAjb4U/gAAAALUlEQVQImV2LQQoAMAjDNvH/T052EMTZSxpKr3r+ZGEOsVzN9ipqLAdiXgD1AY3KJuMDsG57AAAAAElFTkSuQmCC) top left no-repeat"
                                                            width="6" height="5">
                                                            <div></div>
                                                        </td>
                                                        <td style="background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAGCAAAAAAne6vtAAAAAXNCSVQI5gpbmQAAABRJREFUCJlj+Mf0n+k/01+mv0z/ASQJBgCHsPisAAAAAElFTkSuQmCC) top center repeat-x"
                                                            height="5">
                                                            <div></div>
                                                        </td>
                                                        <td style="background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAIAAABvrngfAAAAA3NCSVQICAjb4U/gAAAAMElEQVQImV3LQQoAIAwDwU3x/y8uxEMQq3sKA5Ft3tYkSUBNyi7bn95jXkB1t0+hDbhzI+k87S6fAAAAAElFTkSuQmCC) top right no-repeat"
                                                            width="6" height="5">
                                                            <div></div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAABCAAAAADYooAsAAAAAXNCSVQI5gpbmQAAAA9JREFUCJlj/Pfv35/f/wAU2AXxQSKGrQAAAABJRU5ErkJggg==) center left repeat-y"
                                                            width="6">
                                                            <div></div>
                                                        </td>
                                                        <td>
                                                            <div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;padding-left:20px;padding-right:20px;border-bottom:thin solid #f0f0f0;color:rgba(0,0,0,0.87);font-size:24px;padding-bottom:38px;padding-top:40px;text-align:center;word-break:break-word">
                                                                <div class="m_4985994050750521718v2sp">Your auto generated password is,<br><a style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;color:rgba(0,0,0,0.87);font-size:16px;line-height:1.8">{{password}}</a></div>
                                                            </div>

                                                            <div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:13px;color:rgba(0,0,0,0.87);line-height:1.6;padding-left:20px;padding-right:20px;padding-bottom:32px;padding-top:24px">
                                                                <div class="m_4985994050750521718v2sp">To changes your password by,
                                                                    "Profile-&gt;Change Password" in your admin panel account
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td style="background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAABCAAAAADYooAsAAAAAXNCSVQI5gpbmQAAAA9JREFUCJljfMfKwszMCAAF2wEAPEkdGQAAAABJRU5ErkJggg==) center left repeat-y"
                                                            width="6">
                                                            <div></div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAIAAABvrngfAAAAA3NCSVQICAjb4U/gAAAAOElEQVQImU2KsQ3AQBDCzOv33/hMiouiNCAborZV1ZlRLwAkSXLOAe4ysAy89T9GXdV2M20XvuEBtI4j9oZbd1QAAAAASUVORK5CYII=) top left no-repeat"
                                                            width="6" height="5">
                                                            <div></div>
                                                        </td>
                                                        <td style="background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAGCAAAAAAne6vtAAAAAXNCSVQI5gpbmQAAABRJREFUCJljeM/0h4mViZWJhYkJABOzAgZzi6kOAAAAAElFTkSuQmCC) top center repeat-x"
                                                            height="5">
                                                            <div></div>
                                                        </td>
                                                        <td style="background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAIAAABvrngfAAAAA3NCSVQICAjb4U/gAAAAMUlEQVQImV3KwQ0AIRDDwDim/2q3AB7oOAn/Jgozo6ptAaAnvpJUvTit55Lk9T9dAxtgLwNN4MTbUgAAAABJRU5ErkJggg==) top left no-repeat"
                                                            width="6" height="5">
                                                            <div></div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            <div style="text-align:left">
                                                                <div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;color:rgba(0,0,0,0.54);font-size:12px;line-height:20px;padding-top:10px">
                                                                    <div>You received this email to let you know about your password changes to
                                                                        your Admin Panel Account and services.</div>
                                                                    <div style="direction:ltr">© 2019 Admin Panel,<a class="m_4985994050750521718afal"
                                                                            style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;color:rgba(0,0,0,0.54);font-size:12px;line-height:20px;padding-top:10px">
                                                                            Guindy, Chennai.</a></div>
                                                                </div>
                                                                <div style="display:none!important;max-height:0px;max-width:0px">1537195384000000</div>
                                                            </div>
                                                        </td>
                                                        <td></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr height="32px"></tr>
                </tbody>
            </table>
        </body>
        </html>`;
        /* tslint:enable */
    }
}

export default new AuthService();
