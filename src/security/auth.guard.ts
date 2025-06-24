import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { AdminService } from "src/admin/admin.service";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor (
        private adminService: AdminService
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.checkAuth(request);
    }

    checkAuth(request: Request): boolean {
        return true;
    }
}