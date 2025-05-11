import {  CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new UnauthorizedException("Unauthorized user1");
    }
    
    const bearer = authHeader.split(" ")[0];
    const token = authHeader.split(" ")[1];

    if (bearer !== "Bearer" || !token) {
        throw new UnauthorizedException("Unauthorized user2");
    }

    let user: any;
    try {
        user = this.jwtService.verify(token, {
            secret: process.env.ACCESS_TOKEN_KEY
        })
    } catch (error) {
        throw new UnauthorizedException("Wrong token");
    }
    req.user = user;
    return true;
  }
}
