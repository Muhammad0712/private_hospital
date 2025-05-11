import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Medicine } from './models/medicine.model';

@Controller("medicines")
export class MedicinesController {
  constructor(private readonly medicinesService: MedicinesService) {}

  // ____________________CREATE____________________
  @ApiOperation({
    summary: "Dori qo'shish",
    description: "Yangi dori ma'lumotlarini yaratish",
  })
  @ApiBody({
    description: "Yaratilishi kerak bo'lgan dorining ma'lumotlari",
    type: CreateMedicineDto,
  })
  @ApiResponse({
    status: 201,
    description: "Dori muvaffaqiyatli qo'shildi",
  })
  @ApiResponse({
    status: 400,
    description: "Yuborilgan ma'lumotlar noto'g'ri",
  })
  @Post()
  create(@Body() createMedicineDto: CreateMedicineDto) {
    return this.medicinesService.create(createMedicineDto);
  }

  // ____________________FINDALL____________________
  @ApiOperation({
    summary: "Dorilar ro'yxatini olish",
    description: "Tizimda mavjud bo'lgan barcha dorilar ro'yxatini olish",
  })
  @ApiResponse({
    status: 200,
    type: [Medicine],
    description: "Dorilar ro'yxati muvaffaqiyatli qaytarildi",
  })
  @Get()
  findAll() {
    return this.medicinesService.findAll();
  }

  // ____________________FINDONE____________________
  @ApiOperation({
    summary: "Bitta dorini olish",
    description: "Berilgan ID bo'yicha dori ma'lumotlarini olish",
  })
  @ApiParam({
    name: "id",
    type: String,
    description: "Maʼlumot olinadigan dorining unikal identifikatori",
  })
  @ApiResponse({
    status: 200,
    type: Medicine,
    description: "Dori maʼlumotlari muvaffaqiyatli qaytarildi",
  })
  @ApiResponse({
    status: 404,
    description: "Dori topilmadi",
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.medicinesService.findOne(+id);
  }

  // ____________________UPDATE____________________
  @ApiOperation({
    summary: "Dorini yangilash",
    description: "Berilgan ID bo'yicha dorining ma'lumotlarini yangilash",
  })
  @ApiParam({
    name: "id",
    type: String,
    description: "Yangilanishi kerak bo'lgan dorining unikal identifikatori",
  })
  @ApiBody({
    description: "Dorining yangilanishi uchun kerakli ma'lumotlar",
    type: UpdateMedicineDto,
  })
  @ApiResponse({
    status: 200,
    description: "Dori muvaffaqiyatli yangilandi",
  })
  @ApiResponse({
    status: 404,
    description: "Dori topilmadi",
  })
  @ApiResponse({
    status: 400,
    description: "Yuborilgan ma'lumotlar noto'g'ri",
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateMedicineDto: UpdateMedicineDto
  ) {
    return this.medicinesService.update(+id, updateMedicineDto);
  }

  // ____________________REMOVE____________________
  @ApiOperation({
    summary: "Dorini o'chirish",
    description: "Berilgan ID bo'yicha dorini tizimdan o'chirish",
  })
  @ApiParam({
    name: "id",
    type: String,
    description: "O‘chirilishi kerak bo‘lgan dorining unikal identifikatori",
  })
  @ApiResponse({
    status: 200,
    description: "Dori muvaffaqiyatli o‘chirildi",
  })
  @ApiResponse({
    status: 404,
    description: "Dori topilmadi",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.medicinesService.remove(+id);
  }
}
