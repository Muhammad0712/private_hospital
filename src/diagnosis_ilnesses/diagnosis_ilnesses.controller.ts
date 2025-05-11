import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiagnosisIlnessesService } from './diagnosis_ilnesses.service';
import { CreateDiagnosisIlnessDto } from './dto/create-diagnosis_ilness.dto';
import { UpdateDiagnosisIlnessDto } from './dto/update-diagnosis_ilness.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { DiagnosisIlness } from './models/diagnosis_ilness.model';

@Controller("diagnosis-ilnesses")
export class DiagnosisIlnessesController {
  constructor(
    private readonly diagnosisIlnessesService: DiagnosisIlnessesService
  ) {}

  //____________________CREATE____________________
  @ApiOperation({
    summary: "Tashxis va kasallikni yaratish",
    description: "Yangi tashxis va kasallikni yaratish",
  })
  @ApiBody({
    description:
      "Tashxis va kasallikni yaratish uchun kerakli body ma'lumotlari",
    type: CreateDiagnosisIlnessDto,
  })
  @ApiResponse({
    status: 201,
    description: "Tashxis va kasallik muvaffaqiyatli yaratildi",
  })
  @ApiResponse({
    status: 400,
    description: "Yuborilgan ma'lumotlar noto'g'ri",
  })
  @Post()
  create(@Body() createDiagnosisIlnessDto: CreateDiagnosisIlnessDto) {
    return this.diagnosisIlnessesService.create(createDiagnosisIlnessDto);
  }

  //____________________FINDALL____________________
  @ApiOperation({
    summary: "Barcha tashxis va kasalliklarni olish",
    description: "Barcha mavjud tashxis va kasalliklarni qaytarish",
  })
  @ApiResponse({
    status: 200,
    description: "Barcha tashxis va kasalliklar muvaffaqiyatli qaytarildi",
    type: [DiagnosisIlness],
  })
  @ApiResponse({
    status: 500,
    description: "Server xatoligi",
  })
  @Get()
  findAll() {
    return this.diagnosisIlnessesService.findAll();
  }

  //____________________FINDONE____________________
  @ApiOperation({
    summary: "Tashxis va kasallikni ID bo'yicha olish",
    description: "Berilgan ID bo'yicha tashxis va kasallikni qaytarish",
  })
  @ApiParam({
    name: "id",
    type: String,
    description: "Tashxis va kasallikni olish uchun unikal identifikator",
  })
  @ApiResponse({
    status: 200,
    description: "Tashxis va kasallik muvaffaqiyatli qaytarildi",
    type: DiagnosisIlness,
  })
  @ApiResponse({
    status: 404,
    description: "Tashxis va kasallik topilmadi",
  })
  @ApiResponse({
    status: 500,
    description: "Server xatoligi",
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.diagnosisIlnessesService.findOne(+id);
  }

  //____________________UPDATE____________________
  @ApiOperation({
    summary: "Tashxis va kasallikni yangilash",
    description: "Berilgan ID bo'yicha tashxis va kasallikni yangilash",
  })
  @ApiParam({
    name: "id",
    type: String,
    description:
      "Yangilanishi kerak bo'lgan tashxis va kasallikning unikal identifikatori",
  })
  @ApiBody({
    description: "Yangilash uchun tashxis va kasallik ma'lumotlari",
    type: UpdateDiagnosisIlnessDto,
  })
  @ApiResponse({
    status: 200,
    description: "Tashxis va kasallik muvaffaqiyatli yangilandi",
    type: DiagnosisIlness,
  })
  @ApiResponse({
    status: 404,
    description: "Tashxis va kasallik topilmadi",
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
    @Body() updateDiagnosisIlnessDto: UpdateDiagnosisIlnessDto
  ) {
    return this.diagnosisIlnessesService.update(+id, updateDiagnosisIlnessDto);
  }

  //____________________REMOVE____________________
  @ApiOperation({
    summary: "Tashxis va kasallikni o'chirish",
    description: "Berilgan ID bo'yicha tashxis va kasallikni o'chirish",
  })
  @ApiParam({
    name: "id",
    type: String,
    description:
      "O'chirilishi kerak bo'lgan tashxis va kasallikning unikal identifikatori",
  })
  @ApiResponse({
    status: 200,
    description: "Tashxis va kasallik muvaffaqiyatli o'chirildi",
  })
  @ApiResponse({
    status: 404,
    description: "Tashxis va kasallik topilmadi",
  })
  @ApiResponse({
    status: 400,
    description: "Yuborilgan ma'lumotlar noto'g'ri",
  })
  @ApiResponse({
    status: 500,
    description: "Server xatoligi",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.diagnosisIlnessesService.remove(+id);
  }
}
