import { ApiProperty } from "@nestjs/swagger";

export class CreateRoomDto {

  @ApiProperty({ example: "1", description: "Bu yerga xona raqami kiritiladi" })
  room_number: number;

  @ApiProperty({ example: "1", description: "Bu yerga xona turi kiritiladi, yani jarrohlik uchun yoki rentgen uchun" })
  room_type: string;

  @ApiProperty({ example: "false", description: "Bu yerga xona band yoki band emasligi kiritiladi" })
  is_busy: boolean;

  @ApiProperty({ example: "1", description: "Bu yerga xona holati kiritiladi" })
  status: string;

  @ApiProperty({ example: "false", description: "Bu yerga xona tamirlanishda yoki tamirlanishda emasligi kiritiladi" })
  under_repair: boolean;
}
