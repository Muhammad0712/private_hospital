import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DoctorRoomsService } from './doctor_rooms.service';
import { CreateDoctorRoomDto } from './dto/create-doctor_room.dto';
import { UpdateDoctorRoomDto } from './dto/update-doctor_room.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { DoctorRoom } from './models/doctor_room.model';
import { Roles } from '../common/decorators/roles-auth.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller("doctor-rooms")
export class DoctorRoomsController {
  constructor(private readonly doctorRoomsService: DoctorRoomsService) {}

  // ____________________CREATE____________________
  @ApiOperation({
    summary: "Yangi doktor va xona bog‘lanishini yaratish",
    description:
      "Yangi doktor va xona bog‘lanishini yaratish uchun kerakli ma'lumotlarni yuborish",
  })
  @ApiBody({
    description:
      "Doktor va xona bog‘lanishini yaratish uchun kerakli body ma’lumotlari",
    type: CreateDoctorRoomDto,
  })
  @ApiResponse({
    status: 201,
    description: "Doktor va xona bog‘lanishi muvaffaqiyatli yaratildi",
  })
  @ApiResponse({
    status: 400,
    description: "Yuborilgan maʼlumotlar noto‘g‘ri",
  })
  @Roles("employee")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createDoctorRoomDto: CreateDoctorRoomDto) {
    return this.doctorRoomsService.create(createDoctorRoomDto);
  }

  // ____________________FINDALL____________________
  @ApiOperation({
    summary: "Barcha doktor va xona bog‘lanishlarini olish",
    description:
      "Barcha doktor va xona bog‘lanishlarini olish uchun so‘rov yuborish",
  })
  @ApiResponse({
    status: 200,
    type: [DoctorRoom],
    description: "Barcha doktor va xona bog‘lanishlari muvaffaqiyatli olindi",
  })
  @ApiResponse({
    status: 404,
    description: "Doktor va xona bog‘lanishlari topilmadi",
  })
  @Roles("employee")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.doctorRoomsService.findAll();
  }

  // ____________________FINDONE____________________
  @ApiOperation({
    summary: "Doktor va xona bog‘lanishini ID bo‘yicha olish",
    description:
      "Berilgan ID bo‘yicha doktor va xona bog‘lanishini olish uchun so‘rov yuborish",
  })
  @ApiParam({
    name: "id",
    type: String,
    description: "Doktor va xona bog‘lanishini olish uchun kerakli ID",
  })
  @ApiResponse({
    status: 200,
    type: DoctorRoom,
    description: "Doktor va xona bog‘lanishi muvaffaqiyatli olindi",
  })
  @ApiResponse({
    status: 404,
    description: "Doktor va xona bog‘lanishi topilmadi",
  })
  @Roles("employee")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.doctorRoomsService.findOne(+id);
  }

  // ____________________UPDATE____________________
  @ApiOperation({
    summary: "Doktor va xona bog‘lanishini yangilash",
    description:
      "Berilgan ID bo‘yicha doktor va xona bog‘lanishini yangilash uchun so‘rov yuborish",
  })
  @ApiParam({
    name: "id",
    type: String,
    description: "Yangilanishi kerak bo‘lgan doktor va xona bog‘lanishining ID",
  })
  @ApiBody({
    description:
      "Doktor va xona bog‘lanishini yangilash uchun kerakli body ma'lumotlari",
    type: UpdateDoctorRoomDto,
  })
  @ApiResponse({
    status: 200,
    type: UpdateDoctorRoomDto,
    description: "Doktor va xona bog‘lanishi muvaffaqiyatli yangilandi",
  })
  @ApiResponse({
    status: 404,
    description: "Doktor va xona bog‘lanishi topilmadi",
  })
  @ApiResponse({
    status: 400,
    description: "Yuborilgan ma'lumotlar noto‘g‘ri",
  })
  @Roles("employee")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateDoctorRoomDto: UpdateDoctorRoomDto
  ) {
    return this.doctorRoomsService.update(+id, updateDoctorRoomDto);
  }

  // ____________________REMOVE____________________
  @ApiOperation({
    summary: "Doktor va xona bog‘lanishini o‘chirish",
    description:
      "Berilgan ID bo‘yicha doktor va xona bog‘lanishini o‘chirish uchun so‘rov yuborish",
  })
  @ApiParam({
    name: "id",
    type: String,
    description: "O‘chirilishi kerak bo‘lgan doktor va xona bog‘lanishining ID",
  })
  @ApiResponse({
    status: 200,
    description: "Doktor va xona bog‘lanishi muvaffaqiyatli o‘chirildi",
  })
  @ApiResponse({
    status: 404,
    description: "Doktor va xona bog‘lanishi topilmadi",
  })
  @ApiResponse({
    status: 400,
    description: "Yuborilgan ma'lumotlar noto‘g‘ri",
  })
  @Roles("employee")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.doctorRoomsService.remove(+id);
  }
}
