import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Length, Matches, Validate } from "class-validator"; 


export class CreatePatientDto {
  @ApiProperty({
    example: "Muhammad",
    description: "Bu yerga foydalanuvchi ismi kiritiladi",
  })
  @IsNotEmpty({ message: "Iltimos ismingizni kiriting" })
  first_name: string;

  @ApiProperty({
    example: "Nematullayev",
    description: "Bu yerga foydalanuvchi familyasi kiritiladi",
  })
  @IsNotEmpty({ message: "Iltimos familyangizni kiriting" })
  last_name: string;

  @ApiProperty({
    example: "male",
    description: "Bu yerga foydalanuvchi jinsi kiritiladi",
  })
  @IsNotEmpty({ message: "Iltimos jinsingizni kiriting" })
  gender: string;

  @ApiProperty({
    example: "2000-01-01",
    description: "Bu yerga foydalanuvchi tug'ilgan kunini kiritiladi",
  })
  @IsNotEmpty({ message: "Iltimos tug'ilgan kuningizni kiriting" })
  birth_day: Date;

  @ApiProperty({
    example: "Toshkent",
    description: "Bu yerga foydalanuvchi manzilini kiritiladi",
  })
  @IsNotEmpty({ message: "Iltimos manzilingizni kiriting" })
  address: string;

  @ApiProperty({
    example: "muhammadnematullayev7@gmail.com",
    description: "Bu yerga foydalanuvchi email manzili kiritiladi",
  })
  @IsNotEmpty({ message: "Iltimos emailingizni kiriting" })
  email: string;

  @ApiProperty({
    example: "Muhammad123456",
    description: "Bu yerga foydalanuvchi paroli kiritiladi",
  })
  @IsNotEmpty({ message: "Iltimos parolingizni kiriting" })
  @Matches(
    /^(?=.*\d).{8,}$/, 
    { message:"Parol kamida 8 ta belgidan iborat bo‘lishi va kamida 1 ta raqam bo‘lishi kerak!1"})
  password: string;

  refresh_token: string;
  activation_link: string;
  is_active: boolean;

  @ApiProperty({
    example: "AA",
    description: "Bu yerga foydalanuvchi pasport seriyasi kiritiladi",
  })
  @IsNotEmpty({ message: "Iltimos pasport seriyangizni kiriting" })
  passport_series: string;

  @ApiProperty({
    example: "1234567",
    description: "Bu yerga foydalanuvchi pasport raqami kiritiladi",
  })
  @Length(7, 7, {
    message: "Pasport raqamingiz 7 ta raqamdan iborat bo'lishi kerak!",
  })
  @IsNotEmpty({ message: "Iltimos pasport raqamingizni kiriting" })
  passport_number: string;
}
