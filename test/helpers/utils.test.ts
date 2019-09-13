import { expect, assert } from "chai";
import { ObjectID } from "mongodb";
import utils from "../../src/helpers/Utils";

describe("Utility:: Functions", () => {
    describe("getString", () => {
        it("Typeof input is string, expected output is string", () => {
            const input = "Test string";
            const output = utils.getString(input);
            expect(typeof output).to.be.equal(typeof input);
        });

        it("Typeof input is number, expected string", () => {
            const input = 123;
            const output = (<any>utils).getString(input);
            expect(typeof output).not.equal(typeof input);
        });

        it("Typeof input is boolean, expected string", () => {
            const input = true;
            const output = (<any>utils).getString(input);
            expect(typeof output).not.equal(typeof input);
        });
    });

    describe("isNumber", () => {
        it("Typeof input is number, expected true", () => {
            const input = 1234;
            const output = utils.isNumber(input);
            expect(output).to.be.true;
        });

        it("Typeof input is string, expected false", () => {
            const input = "Test string";
            const output = utils.isNumber(input);
            expect(output).to.be.false;
        });

        it("Typeof input is boolean, expected false", () => {
            const input = true;
            const output = utils.isNumber(input);
            assert.isFalse(output);
        });
    });

    describe("createPromise", () => {
        it("Check is it instance of Promise", () => {
            const output = utils.createPromise();
            assert.instanceOf(output, Promise, "This is instance of Promise");
        });
    });

    describe("getDateIfValid", () => {
        it("Output should be instance of Date", () => {
            const output = utils.getDateIfValid("2018-12-19");
            assert.instanceOf(output, Date, "This is instance of Date");
        });

        it("Input string (eg: 2019-01-01) Output should be instance of Date", (done) => {
            const output: any = utils.getDateIfValid("2018-12-19");
            assert.notEqual(output, NaN, "Not equal to NaN");
            assert.notEqual(output, "Invalid Date");
            done();
        });

        it("Input string NaN Output should be null", () => {
            const output: any = (<any>utils).getDateIfValid(NaN);
            assert.equal(output, null, "equal to null");
        });
    });

    describe("getArrayIfValid", () => {
        it("Instance should be type of Array", () => {
            const output = utils.getArrayIfValid([]);
            assert.instanceOf(output, Array, "This is instance of Array");
        });

        it("Input is array, expected result true", () => {
            const input: Array<any> = [];
            const output = utils.getArrayIfValid(input);
            assert.equal(output, input);
        });

        it("Input is string, expected result false", () => {
            const output = (<any>utils).getArrayIfValid("Test string");
            expect(output).to.be.null;
        });

        it("Input is number, expected result false", () => {
            const output = (<any>utils).getArrayIfValid(123);
            expect(output).to.be.null;
        });

        it("Input is boolean, expected result false", () => {
            const output = (<any>utils).getArrayIfValid(true);
            expect(output).to.be.null;
        });

        it("Input is object, expected result false", () => {
            const output = (<any>utils).getArrayIfValid({});
            expect(output).to.be.null;
        });
    });

    describe("getObjectIDIfValid", () => {
        it("Instance should be type of ObjectID", () => {
            const output = utils.getObjectIDIfValid(new ObjectID().toString());
            assert.instanceOf(output, ObjectID, "This is instance of ObjectId");
        });

        it("Valid input string, expected output valid ObjectId", () => {
            const input = new ObjectID().toString();
            const output = utils.getObjectIDIfValid(input);
            expect(output.toString()).to.equal(new ObjectID(input).toString());
        });

        it("Invalid input string, expected output null", () => {
            const input = "Invalid string";
            const output = utils.getObjectIDIfValid(input);
            assert.isNull(output);
        });
    });

    describe("getArrayOfObjectID", () => {
        it("Instance should be type of Array", () => {
            const output = utils.getArrayOfObjectID([]);
            assert.instanceOf(output, Array, "This is instance of ObjectId");
        });

        it("Input Array of correct Object id string, expected Array of Object id", () => {
            const input: Array<string> = [new ObjectID().toString()];
            const output = utils.getArrayOfObjectID(input);
            assert.instanceOf(output[0], ObjectID, "This is instance of ObjectId");
        });

        it("Input Array of wrong Object id string, expected Array of Object id", () => {
            const input: Array<string> = ["Test string"];
            const output = utils.getArrayOfObjectID(input);
            assert.notInstanceOf(output[0], ObjectID, "This is instance of ObjectId");
        });
    });

    describe("getNumberIfValid", () => {
        it("Input is valid number, expected the same input as output", () => {
            const input = 123;
            const output = utils.getNumberIfValid(input);
            expect(output).to.equal(input);
        });

        it("Input is invalid number, expected null", () => {
            const input = "123x2";
            const output = utils.getNumberIfValid(Number(input));
            assert.isNull(output);
        });

        it("Input is string, expected null", () => {
            const input = "Test string";
            const output = utils.getNumberIfValid(input);
            assert.isNull(output);
        });

        it("Input is array, expected null", () => {
            const input = ["test", 10];
            const output = utils.getNumberIfValid(input);
            assert.isNull(output);
        });

        it("Input is object, expected null", () => {
            const input = {};
            const output = utils.getNumberIfValid(input);
            assert.isNull(output);
        });

        it("Input is boolean, expected null", () => {
            const input = true;
            const output = utils.getNumberIfValid(input);
            assert.isNull(output);
        });
    });

    describe("getNumberIfPositive", () => {
        it("Input is positive number, expected the same input as output", () => {
            const input = 123;
            const output = utils.getNumberIfPositive(input);
            expect(output).to.equal(input);
        });

        it("Input is negative number, expected null", () => {
            const input = -1;
            const output = utils.getNumberIfPositive(input);
            assert.isNull(output);
        });

        it("Input is 0, expected null", () => {
            const input = 0;
            const output = utils.getNumberIfPositive(input);
            assert.isNull(output);
        });
    });
});
