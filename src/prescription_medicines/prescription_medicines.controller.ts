import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrescriptionMedicinesService } from './prescription_medicines.service';
import { CreatePrescriptionMedicineDto } from './dto/create-prescription_medicine.dto';
import { UpdatePrescriptionMedicineDto } from './dto/update-prescription_medicine.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { PrescriptionMedicine } from './models/prescription_medicine.model';

@Controller("prescription-medicines")
export class PrescriptionMedicinesController {
  constructor(
    private readonly prescriptionMedicinesService: PrescriptionMedicinesService
  ) {}

  //____________________CREATE____________________
  @ApiOperation({
    summary: "Yangi retsept dori qo'shish",
    description: "Yangi retsept uchun dori qo'shish",
  })
  @ApiBody({
    description: "Yangi retsept uchun kerakli dori ma'lumotlari",
    type: CreatePrescriptionMedicineDto,
  })
  @ApiResponse({
    status: 201,
    description: "Retsept dori muvaffaqiyatli qo'shildi",
  })
  @ApiResponse({
    status: 400,
    description: "Yuborilgan ma'lumotlar noto'g'ri",
  })
  @ApiResponse({
    status: 500,
    description: "Server xatoligi",
  })
  @Post()
  create(@Body() createPrescriptionMedicineDto: CreatePrescriptionMedicineDto) {
    return this.prescriptionMedicinesService.create(
      createPrescriptionMedicineDto
    );
  }

  //____________________FINDALL____________________
  @ApiOperation({
    summary: "Barcha retsept dorilarini olish",
    description: "Barcha mavjud retsept dorilarini qaytaradi",
  })
  @ApiResponse({
    status: 200,
    description: "Barcha retsept dorilari muvaffaqiyatli qaytarildi",
    type: [PrescriptionMedicine],
  })
  @ApiResponse({
    status: 404,
    description: "Retsept dorilari topilmadi",
  })
  @ApiResponse({
    status: 500,
    description: "Server xatoligi",
  })
  @Get()
  findAll() {
    return this.prescriptionMedicinesService.findAll();
  }

  //____________________FINDONE____________________
  @ApiOperation({
    summary: "Bitta retsept dorisini olish",
    description: "Berilgan ID bo'yicha bitta retsept dorisini qaytaradi",
  })
  @ApiParam({
    name: "id",
    type: String,
    description: "Olish kerak bo'lgan retsept dorisi ID",
  })
  @ApiResponse({
    status: 200,
    description: "Retsept dori muvaffaqiyatli topildi",
    type: PrescriptionMedicine, // Bu yerda PrescriptionMedicine modelini moslashtiring
  })
  @ApiResponse({
    status: 404,
    description: "Retsept dori topilmadi",
  })
  @ApiResponse({
    status: 500,
    description: "Server xatoligi",
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.prescriptionMedicinesService.findOne(+id);
  }

  //____________________UPDATE____________________
  @ApiOperation({
    summary: "Retsept dori ma'lumotlarini yangilash",
    description: "Berilgan ID bo'yicha retsept dorisi ma'lumotlarini yangilash",
  })
  @ApiParam({
    name: "id",
    type: String,
    description: "Yangilanishi kerak bo'lgan retsept dorisi ID",
  })
  @ApiBody({
    description: "Retsept dorisini yangilash uchun kerakli ma'lumotlar",
    type: UpdatePrescriptionMedicineDto,
  })
  @ApiResponse({
    status: 200,
    description: "Retsept dori muvaffaqiyatli yangilandi",
    type: PrescriptionMedicine, // Yangilangan retsept dorisi modelini ko'rsating
  })
  @ApiResponse({
    status: 404,
    description: "Retsept dori topilmadi",
  })
  @ApiResponse({
    status: 400,
    description: "Yuborilgan ma'lumotlar noto'g'ri",
  })
  @ApiResponse({
    status: 500,
    description: "Server xatoligi",
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatePrescriptionMedicineDto: UpdatePrescriptionMedicineDto
  ) {
    return this.prescriptionMedicinesService.update(
      +id,
      updatePrescriptionMedicineDto
    );
  }

  //____________________REMOVE____________________
  @ApiOperation({
    summary: "Retsept dorisini o'chirish",
    description: "Berilgan ID bo'yicha retsept dorisini o'chirish",
  })
  @ApiParam({
    name: "id",
    type: String,
    description: "O'chirilishi kerak bo'lgan retsept dorisi ID",
  })
  @ApiResponse({
    status: 200,
    description: "Retsept dori muvaffaqiyatli o'chirildi",
  })
  @ApiResponse({
    status: 404,
    description: "Retsept dori topilmadi",
  })
  @ApiResponse({
    status: 500,
    description: "Server xatoligi",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.prescriptionMedicinesService.remove(+id);
  }
}
