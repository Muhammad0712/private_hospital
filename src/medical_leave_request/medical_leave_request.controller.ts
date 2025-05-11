import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicalLeaveRequestService } from './medical_leave_request.service';
import { CreateMedicalLeaveRequestDto } from './dto/create-medical_leave_request.dto';
import { UpdateMedicalLeaveRequestDto } from './dto/update-medical_leave_request.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { MedicalLeaveRequest } from './models/medical_leave_request.model';

@Controller("medical-leave-request")
export class MedicalLeaveRequestController {
  constructor(
    private readonly medicalLeaveRequestService: MedicalLeaveRequestService
  ) {}
  //____________________CREATE____________________
  @ApiOperation({
    summary: "Tibbiy ta'til so'rovini yaratish",
    description:
      "Yangi tibbiy ta'til so'rovini yaratish uchun kerakli ma'lumotlar yuboriladi",
  })
  @ApiBody({
    description:
      "Yangi tibbiy ta'til so'rovini yaratish uchun kerakli body ma'lumotlari",
    type: CreateMedicalLeaveRequestDto,
  })
  @ApiResponse({
    status: 201,
    description: "Tibbiy ta'til so'rovi muvaffaqiyatli yaratildi",
  })
  @ApiResponse({
    status: 400,
    description: "Yuborilgan ma'lumotlar noto'g'ri",
  })
  @Post()
  create(@Body() createMedicalLeaveRequestDto: CreateMedicalLeaveRequestDto) {
    return this.medicalLeaveRequestService.create(createMedicalLeaveRequestDto);
  }

  //____________________FINDALL____________________
  @ApiOperation({
    summary: "Tibbiy ta'til so'rovlari ro'yxatini olish",
    description: "Barcha tibbiy ta'til so'rovlarini qaytaradi",
  })
  @ApiResponse({
    status: 200,
    description: "Tibbiy ta'til so'rovlari muvaffaqiyatli olish",
    type: [MedicalLeaveRequest],
  })
  @ApiResponse({
    status: 404,
    description: "Tibbiy ta'til so'rovlari topilmadi",
  })
  @Get()
  findAll() {
    return this.medicalLeaveRequestService.findAll();
  }

  //____________________FINDONE____________________
  @ApiOperation({
    summary: "Tibbiy ta'til so'rovini ID bo'yicha olish",
    description: "Berilgan ID bo'yicha tibbiy ta'til so'rovini olish",
  })
  @ApiParam({
    name: "id",
    type: String,
    description: "Tibbiy ta'til so'rovining unikal identifikatori",
  })
  @ApiResponse({
    status: 200,
    type: MedicalLeaveRequest,
    description: "Tibbiy ta'til so'rovi muvaffaqiyatli qaytarildi",
  })
  @ApiResponse({
    status: 404,
    description: "Tibbiy ta'til so'rovi topilmadi",
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.medicalLeaveRequestService.findOne(+id);
  }

  //____________________UPDATE____________________
  @ApiOperation({
    summary: "Tibbiy ta'til so'rovini yangilash",
    description:
      "Berilgan ID bo'yicha tibbiy ta'til so'rovining ma'lumotlarini yangilash",
  })
  @ApiParam({
    name: "id",
    type: String,
    description: "Yangilanishi kerak bo'lgan tibbiy ta'til so'rovi ID",
  })
  @ApiBody({
    description: "Tibbiy ta'til so'rovini yangilash uchun kerakli ma'lumotlar",
    type: UpdateMedicalLeaveRequestDto,
  })
  @ApiResponse({
    status: 200,
    type: UpdateMedicalLeaveRequestDto,
    description: "Tibbiy ta'til so'rovi muvaffaqiyatli yangilandi",
  })
  @ApiResponse({
    status: 404,
    description: "Tibbiy ta'til so'rovi topilmadi",
  })
  @ApiResponse({
    status: 400,
    description: "Yuborilgan ma'lumotlar noto'g'ri",
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateMedicalLeaveRequestDto: UpdateMedicalLeaveRequestDto
  ) {
    return this.medicalLeaveRequestService.update(
      +id,
      updateMedicalLeaveRequestDto
    );
  }

  //____________________DELETE____________________
  @ApiOperation({
    summary: "Tibbiy ta'til so'rovini o'chirish",
    description: "Berilgan ID bo'yicha tibbiy ta'til so'rovini o'chirish",
  })
  @ApiParam({
    name: "id",
    type: String,
    description: "O'chirilishi kerak bo'lgan tibbiy ta'til so'rovi ID",
  })
  @ApiResponse({
    status: 200,
    description: "Tibbiy ta'til so'rovi muvaffaqiyatli o'chirildi",
  })
  @ApiResponse({
    status: 404,
    description: "Tibbiy ta'til so'rovi topilmadi",
  })
  @ApiResponse({
    status: 400,
    description: "Xatolik yuz berdi",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.medicalLeaveRequestService.remove(+id);
  }
}
