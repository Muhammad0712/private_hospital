import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Matches } from "class-validator";

export class CreateDoctorDto {

  @ApiProperty({ example: "Muhammad", description: "Bu yerga foydalanuvchi ismi kiritiladi" })
  @IsNotEmpty({ message: "Iltimos ismni kiriting" })
  first_name: string;

  @ApiProperty({ example: "Nematullayev", description: "Bu yerga foydalanuvchi familyasi kiritiladi" })
  @IsNotEmpty({ message: "Iltimos familyani kiriting" })
  last_name: string;

  @ApiProperty({ example: "2000-01-01", description: "Bu yerga foydalanuvchi tug'ilgan kuni kiritiladi" })
  @IsNotEmpty({ message: "Iltimos tug'ilgan kunni kiriting" })
  birth_day: Date;

  @ApiProperty({ example: "c:/muhammad/desktop/photo.jpg", description: "Bu yerga foydalanuvchi rasmi kiritiladi" })
  @IsNotEmpty({ message: "Iltimos diplomni kiriting" })
  diploma: string;

  @ApiProperty({ example: "Jarroh", description: "Bu yerga foydalanuvchi mutaxassisligi kiritiladi" })
  @IsNotEmpty({ message: "Iltimos mutaxassisligni kiriting" })
  speciality: string;

  @ApiProperty({ example: "5", description: "Bu yerga foydalanuvchi ish stavkasi kiritiladi" })
  @IsNotEmpty({ message: "Iltimos ish stavkasini kiriting" })
  work_rate: number;

  @ApiProperty({ example: "100000", description: "Bu yerga foydalanuvchi maoshi kiritiladi" })
  @IsNotEmpty({ message: "Iltimos maoshni kiriting" })
  salary: number;

  @ApiProperty({ example: "muhammad@gmail.com", description: "Bu yerga foydalanuvchi emaili kiritiladi" })
  @IsNotEmpty({ message: "Iltimos emailni kiriting" })
  @IsEmail({}, { message: "Iltimos emailni to'g'ri kiriting" })
  email: string;

  @ApiProperty({ example: "Muhammad123", description: "Bu yerga foydalanuvchi paroli kiritiladi" })
  @IsNotEmpty({ message: "Iltimos parolni kiriting" })
  @Matches(/^(?=.*\d).{8,}$/,{ message:"Parol kamida 8 ta belgidan iborat bo‘lishi va kamida 1 ta raqam bo‘lishi kerak!"})
  password: string;

  is_active: boolean;
  refresh_token: string;
}
