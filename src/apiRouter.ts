import express, { Router } from "express";
import JwtAuthendication from "./middleware/JwtAuthendication";
import AuthRoute from "./routes/Auth";

/* Create two router instance for creating open and autendicated routes */
const privateRouter: Router = express.Router();
const openRouter: Router = express.Router();

/* Middleware for validate the jwt token */
privateRouter.use(JwtAuthendication.validateJwtToken);

/* Initialize all the routes */
AuthRoute.initialize(privateRouter, openRouter);
// Register further route instances here

export default {
    privateRouter,
    openRouter
};
