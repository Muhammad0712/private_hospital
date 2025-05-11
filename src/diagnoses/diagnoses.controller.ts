import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiagnosesService } from './diagnoses.service';
import { CreateDiagnosisDto } from './dto/create-diagnosis.dto';
import { UpdateDiagnosisDto } from './dto/update-diagnosis.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Diagnosis } from './models/diagnosis.model';

@Controller("diagnoses")
export class DiagnosesController {
  constructor(private readonly diagnosesService: DiagnosesService) {}

  //____________________CREATE___________________
  @ApiOperation({
    summary: "Yangi tashxis qo'shish",
    description:
      "Tashxis haqidagi ma'lumotlar asosida yangi tashxis yozuvini yaratadi",
  })
  @ApiBody({
    description: "Yaratilayotgan tashxis uchun kerakli ma'lumotlar",
    type: CreateDiagnosisDto,
  })
  @ApiResponse({
    status: 201,
    description: "Tashxis muvaffaqiyatli yaratildi",
    type: CreateDiagnosisDto,
  })
  @ApiResponse({
    status: 400,
    description: "Yuborilgan ma'lumotlar noto‘g‘ri",
  })
  @Post()
  create(@Body() createDiagnosisDto: CreateDiagnosisDto) {
    return this.diagnosesService.create(createDiagnosisDto);
  }

  //____________________FINDALL__________________
  @ApiOperation({
    summary: "Barcha tashxislarni ko'rsatish",
    description: "Barcha tashxislar ro'yxatini qaytaradi",
  })
  @ApiResponse({
    status: 200,
    description: "Tashxislar ro'yxati muvaffaqiyatli qaytarildi",
    type: [Diagnosis],
  })
  @ApiResponse({
    status: 404,
    description: "Tashxislar topilmadi",
  })
  @Get()
  findAll() {
    return this.diagnosesService.findAll();
  }

  //____________________FINDONE__________________
  @ApiOperation({
    summary: "Tashxisni ID bo'yicha ko'rsatish",
    description: "Berilgan ID bo'yicha bitta tashxisni qaytaradi",
  })
  @ApiParam({
    name: "id",
    type: String,
    description: "Tashxisni topish uchun kerakli ID",
  })
  @ApiResponse({
    status: 200,
    description: "Tashxis muvaffaqiyatli topildi",
    type: Diagnosis, // Bitta tashxis modeli
  })
  @ApiResponse({
    status: 404,
    description: "Tashxis topilmadi",
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.diagnosesService.findOne(+id);
  }

  //____________________UPDATE___________________
  @ApiOperation({
    summary: "Tashxisni yangilash",
    description: "Berilgan ID bo'yicha tashxisni yangilash",
  })
  @ApiParam({
    name: "id",
    type: String,
    description: "Yangilanishi kerak bo'lgan tashxisning ID",
  })
  @ApiBody({
    description: "Tashxisni yangilash uchun kerakli body ma'lumotlari",
    type: UpdateDiagnosisDto,
  })
  @ApiResponse({
    status: 200,
    description: "Tashxis muvaffaqiyatli yangilandi",
    type: Diagnosis, // Yangilangan tashxis modeli
  })
  @ApiResponse({
    status: 404,
    description: "Tashxis topilmadi",
  })
  @ApiResponse({
    status: 400,
    description: "Yuborilgan ma'lumotlar noto'g'ri",
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateDiagnosisDto: UpdateDiagnosisDto
  ) {
    return this.diagnosesService.update(+id, updateDiagnosisDto);
  }

  //____________________REMOVE___________________
  @ApiOperation({
    summary: "Tashxisni o'chirish",
    description: "Berilgan ID bo'yicha tashxisni o'chirish",
  })
  @ApiParam({
    name: "id",
    type: String,
    description: "O'chirilishi kerak bo'lgan tashxisning ID",
  })
  @ApiResponse({
    status: 200,
    description: "Tashxis muvaffaqiyatli o'chirildi",
  })
  @ApiResponse({
    status: 404,
    description: "Tashxis topilmadi",
  })
  @ApiResponse({
    status: 400,
    description: "Yuborilgan ma'lumotlar noto'g'ri",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.diagnosesService.remove(+id);
  }
}
