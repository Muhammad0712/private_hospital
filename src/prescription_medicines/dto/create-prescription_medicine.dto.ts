import { ApiProperty } from "@nestjs/swagger";

export class CreatePrescriptionMedicineDto {
  @ApiProperty({ example: "1", description: "Bu yerga dori id raqami keladi" })
  medicineId: number;

  @ApiProperty({ example: "1", description: "Bu yerga retsept id raqami keladi" })
  prescriptionId: number;
}
