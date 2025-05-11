import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeRoomsService } from './employee_rooms.service';
import { CreateEmployeeRoomDto } from './dto/create-employee_room.dto';
import { UpdateEmployeeRoomDto } from './dto/update-employee_room.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { EmployeeRoom } from './models/employee_room.models';

@Controller("employee-rooms")
export class EmployeeRoomsController {
  constructor(private readonly employeeRoomsService: EmployeeRoomsService) {}

  // ____________________CREATE____________________
  @ApiOperation({
    summary: "Xodim va xona bog‘lanishini yaratish",
    description: "Yangi xodim va xona o‘rtasidagi bog‘lanishni yaratadi",
  })
  @ApiBody({
    description:
      "Xodim va xona bog‘lanishini yaratish uchun kerakli ma’lumotlar",
    type: CreateEmployeeRoomDto,
  })
  @ApiResponse({
    status: 201,
    description: "Bog‘lanish muvaffaqiyatli yaratildi",
  })
  @ApiResponse({
    status: 400,
    description: "Yuborilgan ma’lumotlar noto‘g‘ri",
  })
  @Post()
  create(@Body() createEmployeeRoomDto: CreateEmployeeRoomDto) {
    return this.employeeRoomsService.create(createEmployeeRoomDto);
  }

  // ____________________FINDALL____________________
  @ApiOperation({
    summary: "Xodim va xona bog‘lanishlari ro‘yxatini olish",
    description:
      "Barcha xodim va ularning bog‘langan xonalari haqidagi ma’lumotlarni qaytaradi",
  })
  @ApiResponse({
    status: 200,
    type: [EmployeeRoom],
    description: "Bog‘lanishlar muvaffaqiyatli olindi",
  })
  @Get()
  findAll() {
    return this.employeeRoomsService.findAll();
  }

  // ____________________FINDONE____________________
  @ApiOperation({
    summary: "Xodim va xona bog‘lanishini olish",
    description:
      "Berilgan ID bo‘yicha xodim va xona bog‘lanishiga oid ma’lumotni qaytaradi",
  })
  @ApiParam({
    name: "id",
    type: String,
    description: "Bog‘lanishning unikal identifikatori",
  })
  @ApiResponse({
    status: 200,
    type: EmployeeRoom,
    description: "Bog‘lanish topildi va qaytarildi",
  })
  @ApiResponse({
    status: 404,
    description: "Bog‘lanish topilmadi",
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.employeeRoomsService.findOne(+id);
  }

  // ____________________UPDATE____________________

  @ApiOperation({
    summary: "Xodim va xona bog‘lanishini yangilash",
    description:
      "Berilgan ID bo‘yicha mavjud xodim-xona bog‘lanishini yangilaydi",
  })
  @ApiParam({
    name: "id",
    type: String,
    description: "Yangilanadigan bog‘lanishning unikal identifikatori",
  })
  @ApiBody({
    description: "Yangilash uchun kerakli ma'lumotlar",
    type: UpdateEmployeeRoomDto,
  })
  @ApiResponse({
    status: 200,
    description: "Bog‘lanish muvaffaqiyatli yangilandi",
  })
  @ApiResponse({
    status: 404,
    description: "Bog‘lanish topilmadi",
  })
  @ApiResponse({
    status: 400,
    description: "Yuborilgan maʼlumotlar noto‘g‘ri",
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateEmployeeRoomDto: UpdateEmployeeRoomDto
  ) {
    return this.employeeRoomsService.update(+id, updateEmployeeRoomDto);
  }

  // ____________________REMOVE____________________
  @ApiOperation({
    summary: "Xodim va xona bog‘lanishini o‘chirish",
    description: "Berilgan ID bo‘yicha xodim va xona bog‘lanishini o‘chiradi",
  })
  @ApiParam({
    name: "id",
    type: String,
    description:
      "O‘chirilishi kerak bo‘lgan bog‘lanishning unikal identifikatori",
  })
  @ApiResponse({
    status: 200,
    description: "Bog‘lanish muvaffaqiyatli o‘chirildi",
  })
  @ApiResponse({
    status: 404,
    description: "Bog‘lanish topilmadi",
  })
  @ApiResponse({
    status: 400,
    description: "Yuborilgan maʼlumotlar noto‘g‘ri",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.employeeRoomsService.remove(+id);
  }
}
