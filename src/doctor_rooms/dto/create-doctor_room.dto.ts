import { ApiProperty } from "@nestjs/swagger";

export class CreateDoctorRoomDto {
  @ApiProperty({ example: "1", description: "Bu yerga doctor id raqami keladi" })
  doctorId: number;

  @ApiProperty({ example: "1", description: "Bu yerga xona id raqami keladi" })
  roomId: number;
}
