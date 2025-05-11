import { ApiProperty } from "@nestjs/swagger";

export class CreatePrescriptionDto {

  @ApiProperty({ example: "Retsept", description: "Bu yerga retsept qo'shimcha malumotlari kiritiladi" })
  additional: string;

  @ApiProperty({ example: "1", description: "Bu yerga qabul id raqami keladi" })
  doctor_appointment_id: number;
}
