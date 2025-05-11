import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsEmail, IsNotEmpty, Matches } from "class-validator";

export class CreateEmployeeDto {
  @ApiProperty({
    example: "Muhammad",
    description: "Bu yerga foydalanuvchi ismi kiritiladi",
  })
  @IsNotEmpty({ message: "Iltimos ismni kiriting" })
  first_name: string;

  @ApiProperty({
    example: "Nematullayev",
    description: "Bu yerga foydalanuvchi familyasi kiritiladi",
  })
  @IsNotEmpty({ message: "Iltimos familyani kiriting" })
  last_name: string;

  @ApiProperty({
    example: "2000-01-01",
    description: "Bu yerga foydalanuvchi tug'ilgan kuni kiritiladi",
  })
  @IsNotEmpty({ message: "Iltimos tug'ilgan kunni kiriting" })
  birth_day: Date;

  @ApiProperty({
    example: "male",
    description: "Bu yerga foydalanuvchi jinsi kiritiladi",
  })
  @IsNotEmpty({ message: "Iltimos jinsni kiriting" })
  gender: string;

  @ApiProperty({
    example: "AA",
    description: "Bu yerga foydalanuvchi pasport seriyasi kiritiladi",
  })
  @IsNotEmpty({ message: "Iltimos pasport seriyasini kiriting" })
  passport_series: string;

  @ApiProperty({
    example: "1234567",
    description: "Bu yerga foydalanuvchi pasport raqami kiritiladi",
  })
  @IsNotEmpty({ message: "Iltimos pasport raqamini kiriting" })
  passport_number: string;

  @ApiProperty({
    example: "Doktor",
    description: "Bu yerga foydalanuvchi lavozimi kiritiladi",
  })
  @IsNotEmpty({ message: "Iltimos lavozimni kiriting" })
  position: string;

  @ApiProperty({
    example: "5",
    description: "Bu yerga foydalanuvchi ish stavkasi kiritiladi",
  })
  @IsNotEmpty({ message: "Iltimos ish stavkasini kiriting" })
  work_rate: number;

  @ApiProperty({
    example: "100000",
    description: "Bu yerga foydalanuvchi maoshi kiritiladi",
  })
  @IsNotEmpty({ message: "Iltimos maoshni kiriting" })
  salary: number;

  @ApiProperty({
    example: "muhammad@gmail.com",
    description: "Bu yerga foydalanuvchi emaili kiritiladi",
  })
  @IsEmail({}, { message: "Iltimos emailni kiriting" })
  @IsNotEmpty({ message: "Iltimos emailni to'g'ri kiriting" })
  email : string;

  @ApiProperty({ example: "Muhammad123", description: "Bu yerga foydalanuvchi paroli kiritiladi" })
  @IsNotEmpty({ message: "Iltimos parolni kiriting" })
  @Matches(/^(?=.*\d).{8,}$/,{ message:"Parol kamida 8 ta belgidan iborat bo‘lishi va kamida 1 ta raqam bo‘lishi kerak!"})
  password: string;
  
  refresh_token: string;
  is_admin: boolean;
  is_creator: boolean;
  is_active: boolean;
}
