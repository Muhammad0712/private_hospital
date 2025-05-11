import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Room } from './models/room.model';
import { Roles } from '../common/decorators/roles-auth.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller("rooms")
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  // ____________________CREATE____________________
  @ApiOperation({
    summary: "Xona yaratish",
    description: "Yangi xona yaratish uchun kerakli ma'lumotlarni yuborish",
  })
  @ApiBody({
    description: "Yangi xona yaratish uchun kerakli body ma'lumotlari",
    type: CreateRoomDto,
  })
  @ApiResponse({
    status: 201,
    description: "Xona muvaffaqiyatli yaratildi",
  })
  @ApiResponse({
    status: 400,
    description: "Yuborilgan ma'lumotlar noto'g'ri",
  })
  @Roles("employee")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  // ____________________FINDALL____________________
  @ApiOperation({
    summary: "Barcha xonalarni ko'rish",
    description: "Barcha mavjud xonalarni ro'yxat sifatida olish",
  })
  @ApiResponse({
    status: 200,
    type: [Room],
    description: "Barcha xonalar muvaffaqiyatli qaytarildi",
  })
  @ApiResponse({
    status: 404,
    description: "Xonalar topilmadi",
  })
  @Roles("employee")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  // ____________________FINDONE____________________
  @ApiOperation({
    summary: "Bitta xona ma'lumotlarini olish",
    description: "Berilgan ID bo'yicha xona ma'lumotlarini olish",
  })
  @ApiParam({
    name: "id",
    type: String,
    description: "Xona ma'lumotlarini olish uchun kerakli unikal identifikator",
  })
  @ApiResponse({
    status: 200,
    type: Room,
    description: "Xona muvaffaqiyatli qaytarildi",
  })
  @ApiResponse({
    status: 404,
    description: "Xona topilmadi",
  })
  @ApiResponse({
    status: 400,
    description: "Noto'g'ri ID kiritildi",
  })
  @Roles("employee")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.roomsService.findOne(+id);
  }

  // ____________________UPDATE____________________
  @ApiOperation({
    summary: "Xona ma'lumotlarini yangilash",
    description: "Berilgan ID bo'yicha xona ma'lumotlarini yangilash",
  })
  @ApiParam({
    name: "id",
    type: String,
    description: "Yangilanishi kerak bo'lgan xona uchun unikal identifikator",
  })
  @ApiBody({
    description:
      "Xona ma'lumotlarini yangilash uchun kerakli body ma'lumotlari",
    type: UpdateRoomDto,
  })
  @ApiResponse({
    status: 200,
    type: UpdateRoomDto,
    description: "Xona muvaffaqiyatli yangilandi",
  })
  @ApiResponse({
    status: 404,
    description: "Xona topilmadi",
  })
  @ApiResponse({
    status: 400,
    description: "Yuborilgan ma'lumotlar noto'g'ri",
  })
  @Roles("employee")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(+id, updateRoomDto);
  }

  // ____________________REMOVE____________________
  @ApiOperation({
    summary: "Xonani o'chirish",
    description: "Berilgan ID bo'yicha xonani o'chirish",
  })
  @ApiParam({
    name: "id",
    type: String,
    description: "O'chirilishi kerak bo'lgan xona uchun unikal identifikator",
  })
  @ApiResponse({
    status: 200,
    description: "Xona muvaffaqiyatli o'chirildi",
  })
  @ApiResponse({
    status: 404,
    description: "Xona topilmadi",
  })
  @ApiResponse({
    status: 400,
    description: "So'rovda xatolik mavjud",
  })
  @Roles("employee")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.roomsService.remove(+id);
  }
}
