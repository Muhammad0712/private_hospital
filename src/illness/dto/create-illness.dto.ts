import { ApiProperty } from "@nestjs/swagger";

export class CreateIllnessDto {
  @ApiProperty({ example: "Grip", description: "Bu yerga kasallik nomi kiritiladi" })
  illness_name: string;

  @ApiProperty({ example: "Malumot", description: "Bu yerga kasallik qo'shimcha malumotlari kiritiladi" })
  additional: string;
}
