import { ApiProperty } from "@nestjs/swagger";

export class CreateEmployeeRoomDto {
  @ApiProperty({ example: "1", description: "Bu yerga xodim id raqami keladi" })
  employeeId: number;

  @ApiProperty({ example: "1", description: "Bu yerga xona id raqami keladi" })
  roomId: number;
}
