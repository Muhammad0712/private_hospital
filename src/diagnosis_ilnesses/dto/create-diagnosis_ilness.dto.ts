import { ApiProperty } from "@nestjs/swagger";

export class CreateDiagnosisIlnessDto {
  @ApiProperty({ example: "1", description: "Bu yerga diagnoz id raqami keladi" })
  diagnosis_id: number;

  @ApiProperty({ example: "1", description: "Bu yerga kasallik id raqami keladi" })
  illness_id: number;
}
