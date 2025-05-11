import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Doctor } from './models/doctor.model';

@Controller("doctors")
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  //_____________________CREATE_______________________
  @ApiOperation({
    summary: "Doktorni yaratish",
    description: "Yangi doktorni yaratish uchun kerakli ma'lumotlarni yuborish",
  })
  @ApiBody({
    description: "Yangi doktor yaratish uchun kerakli body ma'lumotlari",
    type: CreateDoctorDto,
  })
  @ApiResponse({
    status: 201,
    description: "Doktor muvaffaqiyatli yaratildi",
  })
  @ApiResponse({
    status: 400,
    description: "Yuborilgan ma'lumotlar noto'g'ri",
  })
  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }

  //_____________________FINDALL_______________________
  @ApiOperation({
    summary: "Barcha doktorlarni olish",
    description: "Barcha mavjud doktorlarni olish uchun so'rov yuboriladi",
  })
  @ApiResponse({
    status: 200,
    description: "Doktorlar muvaffaqiyatli olishdi",
    type: [Doctor],
  })
  @ApiResponse({
    status: 400,
    description: "So'rov noto'g'ri",
  })
  @Get()
  findAll() {
    return this.doctorsService.findAll();
  }

  //_____________________FINDONE_______________________
  @ApiOperation({
    summary: "Doktorni ID bo'yicha olish",
    description: "Berilgan ID bo'yicha doktor ma'lumotlarini olish",
  })
  @ApiParam({
    name: "id",
    type: String,
    description: "Doktorni topish uchun uning unikal identifikatori",
  })
  @ApiResponse({
    status: 200,
    description: "Doktor muvaffaqiyatli topildi",
    type: Doctor, // Doctor - model nomi, uni o'zingizning doctor modeliga moslashtiring
  })
  @ApiResponse({
    status: 404,
    description: "Doktor topilmadi",
  })
  @ApiResponse({
    status: 400,
    description: "Noto'g'ri so'rov",
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.doctorsService.findOne(+id);
  }

  //_____________________UPDATE_______________________
  @ApiOperation({
    summary: "Doktor ma'lumotlarini yangilash",
    description: "Berilgan ID bo'yicha doktor ma'lumotlarini yangilash",
  })
  @ApiParam({
    name: "id",
    type: String,
    description: "Yangilanishi kerak bo'lgan doktorning unikal identifikatori",
  })
  @ApiBody({
    description:
      "Doktor ma'lumotlarini yangilash uchun kerakli body ma'lumotlari",
    type: UpdateDoctorDto, // UpdateDoctorDto modelini moslashtiring
  })
  @ApiResponse({
    status: 200,
    description: "Doktor muvaffaqiyatli yangilandi",
  })
  @ApiResponse({
    status: 404,
    description: "Doktor topilmadi",
  })
  @ApiResponse({
    status: 400,
    description: "Yuborilgan ma'lumotlar noto'g'ri",
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorsService.update(+id, updateDoctorDto);
  }

  //_____________________REMOVE_______________________
  @ApiOperation({
    summary: "Doktorni o'chirish",
    description: "Berilgan ID bo'yicha doktorni tizimdan o'chirish",
  })
  @ApiParam({
    name: "id",
    type: String,
    description: "O'chirilishi kerak bo'lgan doktorning unikal identifikatori",
  })
  @ApiResponse({
    status: 200,
    description: "Doktor muvaffaqiyatli o'chirildi",
  })
  @ApiResponse({
    status: 404,
    description: "Doktor topilmadi",
  })
  @ApiResponse({
    status: 400,
    description: "Yuborilgan ma'lumotlar noto'g'ri",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.doctorsService.remove(+id);
  }
}
