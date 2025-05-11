import { Body, Controller, HttpCode, Param, ParseIntPipe, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreatePatientDto } from '../patients/dto/create-patient.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Response } from 'express';
import { CookieGetter } from '../common/decorators/cookie-getter.decorator';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //____________________SIGN UP____________________
  @ApiOperation({
    summary: "Bemorni ro'yxatdan o'tkazish",
    description:
      "Yangi bemorni ro'yxatdan o'tkazish uchun kerakli ma'lumotlarni yuboring",
  })
  @ApiBody({
    description: "Ro'yxatdan o'tkazish uchun bemorning ma'lumotlari",
    type: CreatePatientDto,
  })
  @ApiResponse({
    status: 201,
    description: "Bemor muvaffaqiyatli ro'yxatdan o'tkazildi",
  })
  @ApiResponse({
    status: 400,
    description: "Yuborilgan ma'lumotlar noto'g'ri yoki etishmayapti",
  })
  @ApiResponse({
    status: 409,
    description: "Bemor allaqachon ro'yxatdan o'tgan",
  })
  @Post("sign-up")
  async signUp(@Body() createPatientDto: CreatePatientDto) {
    return this.authService.signUp(createPatientDto);
  }

  //____________________SIGN IN____________________
  @ApiOperation({
    summary: "Bemorni tizimga kirishi",
    description: "Bemor tizimga kirish uchun login va parolni yuboradi.",
  })
  @ApiBody({
    description: "Tizimga kirish uchun bemorning login va paroli",
    type: SignInDto,
  })
  @ApiResponse({
    status: 200,
    description: "Tizimga kirish muvaffaqiyatli amalga oshirildi",
  })
  @ApiResponse({
    status: 400,
    description: "Noto'g'ri login yoki parol",
  })
  @ApiResponse({
    status: 401,
    description: "Kirish uchun ruxsat yo'q",
  })
  @Post("sign-in")
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signIn(signInDto, res);
  }

  //____________________SIGN OUT____________________
  @ApiOperation({
    summary: "Bemorni tizimdan chiqishi",
    description:
      "Bemor tizimdan chiqish uchun refresh tokenni yuboradi va tizimdan chiqadi.",
  })
  @ApiResponse({
    status: 200,
    description: "Tizimdan chiqish muvaffaqiyatli amalga oshirildi",
  })
  @ApiResponse({
    status: 400,
    description:
      "Noto'g'ri refresh token yoki tizimdan chiqish imkoni mavjud emas",
  })
  @HttpCode(200)
  @Post("sign-out")
  signOut(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOut(refreshToken, res);
  }

  //____________________REFRESH____________________
  @ApiOperation({
    summary: "Refresh tokenni yangilash",
    description:
      "Berilgan ID bo'yicha refresh tokenni yangilash uchun yangilangan token qaytariladi.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Refresh token yangilanadigan bemorning unikal identifikatori",
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
  @Post(":id/refresh")
  refresh(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshToken(id, refreshToken, res);
  }
}
