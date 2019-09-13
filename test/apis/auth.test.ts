import request from "supertest";
import { expect } from "chai";
import app from "../../src/app";
import { getDB } from "../TestUtility";

describe("API:: Auth Service", () => {
    let db: any;
    let accessToken: string;

    beforeAll(async () => {
        db = await getDB();
    });

    describe("GET /api/v1", () => {
        it("should return 200 OK", () => {
            return request(app).get("/api/v1")
                .expect(200);
        });
    });

    describe("DB users collection", async () => {
        it("Should return not null", async () => {
            const admin = await db.collection("users").findOne({});
            expect(admin).to.not.equal(null);
        });
    });

    describe("POST /api/v1/login", () => {
        it("Correct input. Should return 200 ok", (done) => {
            request(app).post("/api/v1/login")
                .send({ "email": "admin@gmail.com", "password": "admin123" })
                .end(function (err, res) {
                    accessToken = res.body.data.token;
                    expect(200).to.equal(res.status);
                    done();
                });
        });

        it("Empty password field. Should return 500 Required fields are missing.", (done) => {
            request(app).post("/api/v1/login")
                .send({ "email": "admin@gmail.com", "password": "" })
                .end(function (err, res) {
                    expect(500).to.equal(res.status);
                    done();
                });
        });

        it("Empty email field. Should return 500 Required fields are missing.", (done) => {
            request(app).post("/api/v1/login")
                .send({ "email": "", "password": "admin123" })
                .end(function (err, res) {
                    expect(500).to.equal(res.status);
                    done();
                });
        });

        it("No email field. Should return 500 Required fields are missing.", (done) => {
            request(app).post("/api/v1/login")
                .send({ "password": "admin123" })
                .end(function (err, res) {
                    expect(500).to.equal(res.status);
                    done();
                });
        });

        it("No password field. Should return 500 Required fields are missing.", (done) => {
            request(app).post("/api/v1/login")
                .send({ "email": "admin@gmail.com" })
                .end(function (err, res) {
                    expect(500).to.equal(res.status);
                    done();
                });
        });
    });

    describe("POST /api/v1/admin/index", () => {
        const params = {
            row_per_page: 5,
            page: 1,
            filter: {
                is_active: "",
                roles: "",
                startDate: "",
                endDate: "",
                search_query: ""
            },
            sort: {
                order: "desc",
                orderBy: "name"
            }
        };

        it("Correct params. Should return 200 ok", (done) => {
            request(app).post("/api/v1/admin/index")
                .set("Authorization", accessToken)
                .send(params)
                .end(function (err, res) {
                    expect(200).to.equal(res.status);
                    done();
                });
        });

        it("No params.row_per_page. Should return 200 ok", (done) => {
            delete params.row_per_page;
            request(app).post("/api/v1/admin/index")
                .set("Authorization", accessToken)
                .send(params)
                .end(function (err, res) {
                    expect(200).to.equal(res.status);
                    done();
                });
        });

        it("No params.page. Should return 200 ok", (done) => {
            const noPage = Object.assign({}, params);
            delete noPage.page;
            request(app).post("/api/v1/admin/index")
                .set("Authorization", accessToken)
                .send(noPage)
                .end(function (err, res) {
                    expect(200).to.equal(res.status);
                    done();
                });
        });

        it("No params.sort. Should return 200 ok", (done) => {
            const noSort = Object.assign({}, params);
            delete noSort.sort;
            request(app).post("/api/v1/admin/index")
                .set("Authorization", accessToken)
                .send(noSort)
                .end(function (err, res) {
                    expect(200).to.equal(res.status);
                    done();
                });
        });

        it("Empty sort order. Should return 200 ok", (done) => {
            const emptySortOrder = Object.assign({}, params);
            emptySortOrder.sort.order = "";
            request(app).post("/api/v1/admin/index")
                .set("Authorization", accessToken)
                .send(emptySortOrder)
                .end(function (err, res) {
                    expect(200).to.equal(res.status);
                    done();
                });
        });

        it("Empty sort orderBy. Should return 500 bad sort specification", (done) => {
            const emptySortOrderBy = Object.assign({}, params);
            emptySortOrderBy.sort.orderBy = "";
            request(app).post("/api/v1/admin/index")
                .set("Authorization", accessToken)
                .send(emptySortOrderBy)
                .end(function (err, res) {
                    expect(500).to.equal(res.status);
                    done();
                });
        });
    });
});
