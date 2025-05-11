import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class SignInDto {
  @ApiProperty({
    example: "kamol@gmail.com",
    description: "Bu yerga foydalanuvchi emaili kiritiladi",
  })
  @IsEmail({} , { message: "Iltimos emailni to'g'ri kiriting" })
  readonly email: string;

  @ApiProperty({
    example: "Kamol123",
    description: "Bu yerga foydalanuvchi paroli kiritiladi",
  })
  readonly password: string;
}