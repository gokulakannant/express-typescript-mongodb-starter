import * as path from "path";
import AuthService from "../services/auth/AuthService";
import { buildSuccessResponse } from "../helpers/ResponseBuilder";
import { Router, Request, Response, NextFunction } from "express";
import { BaseRoute, LoginResponse, GridResponse } from "../types";

class AuthRoute implements BaseRoute {
    constructor(private _router: Router, private _openRouter: Router) {
        this.registerRoutes();
    }

    static initialize(router: Router, openRouter: Router): AuthRoute {
        return new AuthRoute(router, openRouter);
    }

    private registerRoutes(): void {
        this._router.post(
            "/v1/admin/index",
            this.index.bind(this),
        );
        this._router.post(
            "/v1/admin/store",
            this.store.bind(this)
        );
        this._router.put(
            "/v1/admin/update/:id",
            this.update.bind(this),
        );
        this._router.delete(
            "/v1/admin/delete",
            this.delete.bind(this),
        );
        this._openRouter.post(
            "/v1/login",
            this.handleLogin.bind(this),
        );
        this._router.get(
            "/v1/admin/:id",
            this.getUserById.bind(this),
        );
    }

    index(req: Request, res: Response, next: NextFunction): void {
        AuthService.index(req.body)
            .then((data: GridResponse) => {
                res.send(buildSuccessResponse(data, "Admin users fetched successfully"));
            })
            .catch(next);
    }

    store(req: Request, res: Response, next: NextFunction): void {
        AuthService.store(req.body)
            .then((data: boolean | void) => {
                res.send(buildSuccessResponse(data, "Admin user added successfully"));
            })
            .catch(next);
    }

    update(req: Request, res: Response, next: NextFunction): void {
        AuthService.update(req.params.id, req.body)
            .then((data: boolean) => {
                res.send(buildSuccessResponse(data, "Admin user updated successfully"));
            })
            .catch(next);
    }

    delete(req: Request, res: Response, next: NextFunction): void {
        AuthService.delete(req.body)
            .then((data: boolean) => {
                res.send(buildSuccessResponse(data, "Admin user removed successfully"));
            })
            .catch(next);
    }

    private getUserById(req: Request, res: Response, next: NextFunction): void {
        AuthService.getUserById(req.params.id)
            .then((data: Array<any>) => {
                res.send(buildSuccessResponse(data, "Admin user fetched successfully"));
            })
            .catch(next);
    }

    private handleLogin(req: Request, res: Response, next: NextFunction): void {
        AuthService.login(req.body)
            .then((response: LoginResponse) => {
                res.send(buildSuccessResponse(response, "Successfully logged in"));
            })
            .catch(next);
    }
}

export default AuthRoute;
