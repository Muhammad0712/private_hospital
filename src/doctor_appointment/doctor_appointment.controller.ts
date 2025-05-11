import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DoctorAppointmentService } from './doctor_appointment.service';
import { CreateDoctorAppointmentDto } from './dto/create-doctor_appointment.dto';
import { UpdateDoctorAppointmentDto } from './dto/update-doctor_appointment.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { DoctorAppointment } from './models/doctor_appointment.models';

@Controller("doctor-appointment")
export class DoctorAppointmentController {
  constructor(
    private readonly doctorAppointmentService: DoctorAppointmentService
  ) {}

  //_______________________CREATE_______________________
  @ApiOperation({
    summary: "Doktor qabulini yaratish",
    description:
      "Yangi doktor qabulini yaratish uchun kerakli ma'lumotlarni yuboring",
  })
  @ApiBody({
    description: "Doktor qabulini yaratish uchun kerakli body ma'lumotlari",
    type: CreateDoctorAppointmentDto,
  })
  @ApiResponse({
    status: 201,
    description: "Doktor qabul muvaffaqiyatli yaratildi",
  })
  @ApiResponse({
    status: 400,
    description: "Yuborilgan ma'lumotlar noto'g'ri",
  })
  @ApiResponse({
    status: 500,
    description: "Server xatosi",
  })
  @Post()
  create(@Body() createDoctorAppointmentDto: CreateDoctorAppointmentDto) {
    return this.doctorAppointmentService.create(createDoctorAppointmentDto);
  }

  //_______________________FINDALL_______________________
  @ApiOperation({
    summary: "Barcha doktor qabullarini olish",
    description: "Tayyinlangan barcha doktor qabul ma'lumotlarini olish",
  })
  @ApiResponse({
    status: 200,
    type: [DoctorAppointment], 
    description: "Barcha doktor qabul ma'lumotlari muvaffaqiyatli qaytarildi",
  })
  @ApiResponse({
    status: 404,
    description: "Doktor qabul ma'lumotlari topilmadi",
  })
  @Get()
  findAll() {
    return this.doctorAppointmentService.findAll();
  }

  //_______________________FINDONE_______________________
  @ApiOperation({
    summary: "Doktor qabulini id bo'yicha olish",
    description: "Berilgan ID bo'yicha doktor qabulini olish",
  })
  @ApiParam({
    name: "id",
    type: String,
    description: "Qabulning unikal identifikatori",
  })
  @ApiResponse({
    status: 200,
    type: DoctorAppointment,
    description: "Doktor qabul muvaffaqiyatli topildi",
  })
  @ApiResponse({
    status: 404,
    description: "Doktor qabul topilmadi",
  })
  @ApiResponse({
    status: 400,
    description: "Yuborilgan ma'lumotlar noto'g'ri",
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.doctorAppointmentService.findOne(+id);
  }

  //_______________________UPDATE_______________________
  @ApiOperation({
    summary: "Doktor qabulini yangilash",
    description:
      "Berilgan ID bo'yicha doktor qabulining ma'lumotlarini yangilash",
  })
  @ApiParam({
    name: "id",
    type: String,
    description: "Yangilanishi kerak bo`lgan qabulning unikal identifikatori",
  })
  @ApiBody({
    description: "Doktor qabulini yangilash uchun kerakli body ma'lumotlari",
    type: UpdateDoctorAppointmentDto,
  })
  @ApiResponse({
    status: 200,
    type: UpdateDoctorAppointmentDto,
    description: "Doktor qabul muvaffaqiyatli yangilandi",
  })
  @ApiResponse({
    status: 404,
    description: "Qabul topilmadi",
  })
  @ApiResponse({
    status: 400,
    description: "Yuborilgan ma'lumotlar noto'g'ri",
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateDoctorAppointmentDto: UpdateDoctorAppointmentDto
  ) {
    return this.doctorAppointmentService.update(
      +id,
      updateDoctorAppointmentDto
    );
  }

  //_______________________REMOVE_______________________
  @ApiOperation({
    summary: "Doktor qabulini o'chirish",
    description: "Berilgan ID bo'yicha doktor qabulini o'chirish",
  })
  @ApiParam({
    name: "id",
    type: String,
    description: "O'chirilishi kerak bo'lgan qabulning unikal identifikatori",
  })
  @ApiResponse({
    status: 200,
    description: "Doktor qabul muvaffaqiyatli o'chirildi",
  })
  @ApiResponse({
    status: 404,
    description: "Qabul topilmadi",
  })
  @ApiResponse({
    status: 400,
    description: "Yuborilgan ma'lumotlar noto'g'ri",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.doctorAppointmentService.remove(+id);
  }
}
