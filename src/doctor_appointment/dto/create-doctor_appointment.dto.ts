import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateDoctorAppointmentDto {
  @ApiProperty({ example: "1", description: "Bu yerga bemor id raqami keladi" })
  patientId: number;

  @ApiProperty({ example: "1", description: "Bu yerga doctor id raqami keladi" })
  doctorId: number;

  @ApiProperty({ example: "1", description: "Bu yerga xona id raqami keladi" })
  roomId: number;

  @ApiProperty({example: "Shikoyat", description: "Bu yerga bemor shikoyati kiritiladi"})
  @IsNotEmpty({ message: "Iltimos shikoyatni kiriting" })
  complaint: string;

  @ApiProperty({example: "1", description: "Bu yerga bemorning navbat raqami keladi"}) 
  patient_queue: number;
}
