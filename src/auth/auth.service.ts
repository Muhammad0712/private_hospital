import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreatePatientDto } from "../patients/dto/create-patient.dto";
import { SignInDto } from "./dto/sign-in.dto";

import * as bcrypt from "bcrypt";
import { Response } from "express";
import { PatientsService } from "../patients/patients.service";
import { Patient } from "../patients/models/patient.model";

@Injectable()
export class AuthService {
  constructor(
    private readonly patientsService: PatientsService,
    private readonly jwtService: JwtService
  ) {}

  async generateTokens(user: Patient) {
    const payload = {
      id: user.id,
      email: user.is_active,
      role: "patient",
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async signUp(createPatientDto: CreatePatientDto) {
    const candidate = await this.patientsService.findUserByEmail(
      createPatientDto.email
    );
    if (candidate) {
      throw new ConflictException("Bunday email tizimda mavjud!");
    }
    const newUser = await this.patientsService.create(createPatientDto);
    return { message: "Foydalanuvchi qo'shildi!", userId: newUser.id };
  }

  async signIn(signInDto: SignInDto, res: Response) {
    const user = await this.patientsService.findUserByEmail(signInDto.email);
    if (!user) {
      throw new BadRequestException("Email yoki parol noto'g'ri!");
    }
    if (!user.is_active) {
      throw new BadRequestException("Avval emailni tasdiqlang!");
    }
    const isValidPassword = await bcrypt.compare(
      signInDto.password,
      user.password
    );

    const { accessToken, refreshToken } = await this.generateTokens(user);
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });
    user.refresh_token = await bcrypt.hash(refreshToken, 7);
    await user.save();
    return {
      message: "Tizimga xush kelibsiz!",
      accessToken,
    };
  }

  async signOut(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!userData) {
      throw new ForbiddenException("User not verified!");
    }
    const hashed_refresh_token = "";
    await this.patientsService.updateRefreshToken(
      userData.id,
      hashed_refresh_token!
    );

    res.clearCookie("refresh_token");
    const response = {
      message: "User logged out succesfully!",
    };
    return response;
  }

  async refreshToken(userId: number, refresh_token: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refresh_token);
    console.log(userId);
    console.log(decodedToken["id"]);

    if (userId !== decodedToken["id"]) {
      throw new ForbiddenException("Ruxsat etilmagan!");
    }
    const user = await this.patientsService.findOne(userId);
    console.log(user);
    if (!user && !user!.refresh_token) {
      throw new NotFoundException("User not found");
    }

    const tokenMatch = await bcrypt.compare(
      refresh_token,
      user!.refresh_token
    );
    if (!tokenMatch) {
      throw new ForbiddenException("Forbidden");
    }

    const { accessToken, refreshToken } = await this.generateTokens(user!);
    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await this.patientsService.updateRefreshToken(user!.id, hashed_refresh_token);

    res.cookie("refresh_token", refresh_token, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    const response = {
      message: "User refreshed",
      userId: user!.id,
      access_token: accessToken,
    };
    return response;
  }
}
