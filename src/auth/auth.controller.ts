import {
  Body,
  Controller,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreatePatientDto } from "../patients/dto/create-patient.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { Response } from "express";
import { CookieGetter } from "../common/decorators/cookie-getter.decorator";
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { PatientsService } from "../patients/patients.service";
import { EmployeesService } from "../employees/employees.service";
import { DoctorsService } from "../doctors/doctors.service";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly pantientsService: PatientsService,
    private readonly employeesService: EmployeesService,
    private readonly doctorsService: DoctorsService
  ) {}

  //_______________________________PATIENTLAR UCHUN_______________________________

  //____________________SIGN-UP-PATIENT____________________
  @ApiOperation({
    summary: "Yangi bemorni ro'yxatdan o'tkazish",
    description:
      "Foydalanuvchi (bemorni) ro'yxatdan o'tkazish va unga tegishli tokenlarni yaratish.",
  })
  @ApiBody({
    type: CreatePatientDto,
    description: "Ro'yxatdan o'tish uchun foydalanuvchi ma'lumotlari",
  })
  @ApiResponse({
    status: 201,
    description: "Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi",
  })
  @ApiResponse({
    status: 400,
    description:
      "Ma'lumotlar noto‘g‘ri kiritilgan yoki foydalanuvchi allaqachon mavjud",
  })
  @Post("patients/sign-up")
  async signUpPatient(@Body() createPatientDto: CreatePatientDto) {
    return this.authService.signUp(this.pantientsService, createPatientDto);
  }

  //____________________SIGN-IN-PATIENT____________________
  @ApiOperation({
    summary: "Bemorni tizimga kirishi",
    description: "Email va parol orqali tizimga kirish va access token olish.",
  })
  @ApiBody({
    type: SignInDto,
    description: "Tizimga kirish uchun email va parol",
  })
  @ApiResponse({
    status: 200,
    description: "Muvaffaqiyatli tizimga kirildi va access token qaytarildi",
  })
  @ApiResponse({
    status: 400,
    description: "Email yoki parol noto'g'ri",
  })
  @ApiResponse({
    status: 401,
    description: "Tizimga kirish uchun avtorizatsiya talab qilinadi",
  })
  @Post("patients/sign-in")
  async signInPatient(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signIn(this.pantientsService, signInDto, res);
  }

  //____________________SIGN-OUT-PATIENT____________________
  @ApiOperation({
    summary: "Bemorni tizimdan chiqarish",
    description:
      "Refresh token orqali bemorni tizimdan chiqarish va cookie'ni tozalash.",
  })
  @ApiResponse({
    status: 200,
    description: "Muvaffaqiyatli tizimdan chiqdi",
  })
  @ApiResponse({
    status: 401,
    description: "Avtorizatsiya talab qilinadi yoki refresh token mavjud emas",
  })
  @HttpCode(200)
  @Post("patients/sign-out")
  signOutPatient(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOut(this.pantientsService, refreshToken, res);
  }

  //____________________REFRESH-PATIENT____________________
  @ApiOperation({
    summary: "Bemorning refresh tokenini yangilash",
    description:
      "Berilgan ID bo‘yicha refresh tokenni yangilaydi va yangi access token qaytariladi.",
  })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Bemorning unikal identifikatori",
  })
  @ApiResponse({
    status: 200,
    description: "Access token muvaffaqiyatli yangilandi",
  })
  @ApiResponse({
    status: 400,
    description: "Refresh token noto‘g‘ri yoki foydalanuvchi topilmadi",
  })
  @ApiResponse({
    status: 401,
    description: "Avtorizatsiya talab qilinadi yoki refresh token mavjud emas",
  })
  @HttpCode(200)
  @Post("patients/:id/refresh")
  refreshPatient(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshToken(
      this.pantientsService,
      id,
      refreshToken,
      res
    );
  }

  //_______________________________EMPLOYEES_______________________________

  //____________________SIGN-IN-EMPLOYEE____________________
  @ApiOperation({
    summary: "Xodimni tizimga kirishini amalga oshirish",
    description:
      "Email va parol asosida xodim tizimga kiradi, access token qaytariladi.",
  })
  @ApiBody({
    type: SignInDto,
    description: "Xodimning tizimga kirish ma’lumotlari (email va parol)",
  })
  @ApiResponse({
    status: 201,
    description: "Tizimga muvaffaqiyatli kirildi va access token qaytarildi",
  })
  @ApiResponse({
    status: 400,
    description: "Email yoki parol noto‘g‘ri, yoki email tasdiqlanmagan",
  })
  @Post("employees/sign-in")
  async signInEmployee(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signIn(this.employeesService, signInDto, res);
  }

  //____________________SIGN-OUT-EMPLOYEE____________________
  @ApiOperation({
    summary: "Xodimni tizimdan chiqishini amalga oshirish",
    description: "Refresh token orqali tizimdan chiqadi va cookie o‘chiriladi.",
  })
  @ApiResponse({
    status: 200,
    description: "Tizimdan muvaffaqiyatli chiqildi",
  })
  @ApiResponse({
    status: 401,
    description: "Avtorizatsiya talab qilinadi yoki refresh token mavjud emas",
  })
  @HttpCode(200)
  @Post("employees/sign-out")
  signOutEmployee(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOut(this.employeesService, refreshToken, res);
  }

  //____________________REFRESH-EMPLOYEE____________________
  @ApiOperation({
    summary: "Xodim uchun refresh token yangilash",
    description: "Berilgan ID bo'yicha xodimning refresh tokenini yangilaydi.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description:
      "Refresh tokeni yangilanishi kerak bo‘lgan xodimning unikal identifikatori",
  })
  @ApiResponse({
    status: 200,
    description: "Refresh token muvaffaqiyatli yangilandi",
  })
  @ApiResponse({
    status: 400,
    description: "Refresh token noto‘g‘ri yoki ma’lumotlar noto‘g‘ri",
  })
  @ApiResponse({
    status: 401,
    description:
      "Avtorizatsiya talab qilinadi yoki yangilanish uchun tizimga kirish kerak",
  })
  @HttpCode(200)
  @Post("employees/:id/refresh")
  refreshEmployee(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshToken(
      this.employeesService,
      id,
      refreshToken,
      res
    );
  }

  //_______________________________DOCTORS_______________________________
  //____________________SIGN-IN-DOCTOR____________________
  @ApiOperation({
    summary: "Doktorni tizimga kirishini amalga oshirish",
    description:
      "Email va parol asosida doktor tizimga kiradi, access token qaytariladi.",
  })
  @ApiBody({
    type: SignInDto,
    description: "Doktorning tizimga kirish ma’lumotlari (email va parol)",
  })
  @ApiResponse({
    status: 201,
    description: "Tizimga muvaffaqiyatli kirildi va access token qaytarildi",
  })
  @ApiResponse({
    status: 400,
    description: "Email yoki parol noto‘g‘ri, yoki email tasdiqlanmagan",
  })
  @Post("doctors/sign-in")
  async signInDoctor(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signIn(this.doctorsService, signInDto, res);
  }

  //____________________SIGN-OUT-DOCTOR____________________
  @ApiOperation({
    summary: "Xodim uchun tizimdan chiqish",
    description:
      "Xodimning refresh tokenini yangilash orqali tizimdan chiqish amalga oshiriladi.",
  })
  @ApiResponse({
    status: 200,
    description: "Tizimdan muvaffaqiyatli chiqish amalga oshirildi",
  })
  @ApiResponse({
    status: 400,
    description: "Refresh token noto‘g‘ri yoki ma’lumotlar noto‘g‘ri",
  })
  @ApiResponse({
    status: 401,
    description: "Tizimdan chiqish uchun avtorizatsiya talab qilinadi",
  })
  @HttpCode(200)
  @Post("employees/sign-out")
  signOutDoctor(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOut(this.doctorsService, refreshToken, res);
  }

  //____________________REFRESH-DOCTOR____________________
  @ApiOperation({
    summary: "Doktor uchun refresh tokenni yangilash",
    description:
      "Berilgan doktorning ID bo'yicha refresh token yangilanadi va yangi access token qaytariladi.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description:
      "Refresh token yangilanishi kerak bo‘lgan doktorning unikal identifikatori",
  })
  @ApiResponse({
    status: 200,
    description: "Refresh token muvaffaqiyatli yangilandi",
  })
  @ApiResponse({
    status: 400,
    description: "Refresh token noto‘g‘ri yoki ma’lumotlar noto‘g‘ri",
  })
  @ApiResponse({
    status: 401,
    description:
      "Tizimdan chiqish yoki yangilanish uchun avtorizatsiya talab qilinadi",
  })
  @HttpCode(200)
  @Post("doctors/:id/refresh")
  refreshDoctor(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshToken(
      this.doctorsService,
      id,
      refreshToken,
      res
    );
  }
}
