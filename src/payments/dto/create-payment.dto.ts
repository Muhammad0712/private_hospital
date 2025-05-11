import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentDto {

  @ApiProperty({ example: "1", description: "Bu yerga qabul id raqami keladi" })
  doctor_appointment_id: number;

  @ApiProperty({ example: "100000", description: "Bu yerga summa raqami keladi" })
  quantity: number;

  @ApiProperty({ example: "cash", description: "Bu yerga to'lov turi kiritiladi" })
  payment_type: string;
}
