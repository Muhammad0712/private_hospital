import { ApiProperty } from "@nestjs/swagger";

export class CreateMedicineDto {
  @ApiProperty({ example: "Tsefazolin", description: "Bu yerga dori nomi kiritiladi" })
  name: string;

  @ApiProperty({ example: "1", description: "Bu yerga kasallik id raqami keladi" })
  illnessId: number;

  @ApiProperty({ example: "3", description: "Bu yerga bolalar dorini necha kun davomida qabul qilishi kiritiladi" })
  for_children: number;

  @ApiProperty({ example: "3", description: "Bu yerga kattalar dorini necha kun davomida qabul qilishi kiritiladi" })
  for_adults: number;

  @ApiProperty({ example: "3", description: "Bu yerga bolalar dorini qancha miqdorda qabul qilishi kiritiladi" })
  amount_for_children: number;

  @ApiProperty({ example: "3", description: "Bu yerga kattalar dorini qancha miqdorda qabul qilishi kiritiladi" })
  amount_for_adults: number;

  @ApiProperty({ example: "Malumot", description: "Bu yerga kasallik qo'shimcha malumotlari kiritiladi" })
  medicine_info: string;
}
