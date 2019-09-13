import { ObjectID, ObjectId } from "mongodb";

class Utils {
    /**
     * A static private property for make Utils class as a singleton
     */
    private static _instance: Utils;

    /**
     * Creating a new instance of Utils class and stored into the static property _instance
     *
     * @returns A instance of {@link Utils} class
     */
    static getInstance(): Utils {
        if (!this._instance) {
            this._instance = new Utils();
        }
        return this._instance;
    }

    /**
     * To parse the input value to string type
     *
     * @returns string
     */
    getString = (value: string): string => (value || "").toString();

    /**
     * Utils the given string value to date object
     *
     * @param value Converted date object
     */
    getDateIfValid(value: string): Date {
        const date = Date.parse(value);
        return Number.isNaN(date) ? null : new Date(date);
    }

    /**
     * Returning a input value is an array. Otherwise returning null
     */
    getArrayIfValid = (value: Array<any>): Array<any> | null => {
        return Array.isArray(value) ? value : null;
    }

    /**
     * Check the input is valid object id. If it is true means, returns new ObjectId
     *
     * @returns ObjectID (i.e) Mongodb object id
     */
    getObjectIDIfValid = (value: string): ObjectId | null => {
        return ObjectID.isValid(value) ? new ObjectID(value) : null;
    }

    /**
     * Utils the given array of string to array of Object id.
     *
     * @param value Parsed array of Object id's
     */
    getArrayOfObjectID(value: Array<string>) {
        let valueCollection: Array<ObjectId> = [];
        if (Array.isArray(value) && value.length > 0) {
            valueCollection = value.map(id => this.getObjectIDIfValid(id)).filter(id => !!id);
        }
        return valueCollection;
    }

    /**
     * To check the input value is number type. Else returning false
     *
     * @returns boolean
     */
    isNumber = (value: any): boolean => !Number.isNaN(parseFloat(value)) && Number.isFinite(value);

    /**
     * Utils the given input into number
     */
    getNumberIfValid = (value: any) => (this.isNumber(value) ? parseFloat(value) : null);

    /**
     * Utils the input and returning a positive number
     *
     * @param value A positive number value
     */
    getNumberIfPositive (value: number) {
        const n = this.getNumberIfValid(value);
        return n && n >= 0 ? n : null;
    }

    /**
     * Check the input value is boolean
     *
     * @param value string
     * @param defaultValue null
     */
    getBooleanIfValid (value: string, defaultValue: boolean = null): boolean {
        if (value === "true" || value === "false") {
            return value === "true";
        } else {
            return typeof value === "boolean" ? value : defaultValue;
        }
    }

    /**
     * Filter the browser details from the given browser data
     *
     * @param browser window object
     */
    getBrowser (browser: any) {
        return (browser)
            ? {
                ip: this.getString(browser.ip),
                user_agent: this.getString(browser.user_agent)
            }
            : {
                ip: "",
                user_agent: ""
            };
    }

    /**
     * Helper method for creating promise
     */
    createPromise() {
        let localResolve;
        let localReject;

        const promise: any = new Promise((resolve, reject) => {
            localResolve = resolve;
            localReject = reject;
        });
        promise.resolve = localResolve;
        promise.reject = localReject;

        return promise;
    }

    /**
     * To return the first element of an array
     */
    head = (array: Array<any>) => array[0];

    /**
     * Generating random password for newly registering user
     */
    getSecurePassword() {
        return Array(10)
                .fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$")
                .map(function(x) { return x[Math.floor(Math.random() * x.length)]; })
                .join("");
    }

    /**
     * `tsFormat` in the sense, timestamp format. Which is used to retrive the locale timestring
     */
    tsFormat = () => (new Date()).toLocaleTimeString();
}

export default Utils.getInstance();
