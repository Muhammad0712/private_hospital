import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateDiagnosisDto {

  @ApiProperty({ example: "Toshkent", description: "Bu yerga foydalanuvchi qo'shimcha malumotlari kiritiladi" })
  additional: string;

  @ApiProperty({ example: "1", description: "Bu yerga doctor qabuli id raqami keladi!" })
  doctor_appointment_id: number;
}
