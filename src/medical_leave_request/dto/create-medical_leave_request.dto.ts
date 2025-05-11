import { ApiProperty } from "@nestjs/swagger";

export class CreateMedicalLeaveRequestDto {
  @ApiProperty({ example: "1", description: "Bu yerga bemor qabulining id raqami keladi" })
  doctorAppointmentId: number;

  @ApiProperty({ example: "Sabab", description: "Bu yerga foydalanuvchi ishdan vaqtincha tatil olish sababi kiritiladi" })
  reason: string;

  @ApiProperty({ example: "2023-01-01", description: "Ishdan vaqtincha olingan ta'til boshlanish sanasi kiritiladi" })
  start_date: Date;

  @ApiProperty({ example: "2023-01-01", description: "Ishdan vaqtincha olingan ta'til tugash sanasi kiritiladi" })
  end_date: Date;
}
