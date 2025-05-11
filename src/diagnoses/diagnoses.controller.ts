import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DiagnosesService } from './diagnoses.service';
import { CreateDiagnosisDto } from './dto/create-diagnosis.dto';
import { UpdateDiagnosisDto } from './dto/update-diagnosis.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Diagnosis } from './models/diagnosis.model';
import { JwtSelfGuard } from '../common/guards/jwt-self.guard';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles-auth.decorator';
import { RolesGuard } from '../common/guards/roles.guard';


@Controller("diagnoses")
export class DiagnosesController {
  constructor(private readonly diagnosesService: DiagnosesService) {}

  //____________________CREATE FOR ADMINS AND DOCTORS___________________
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
  @Roles("doctor", "employee")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post("admins")
  create(@Body() createDiagnosisDto: CreateDiagnosisDto) {
    return this.diagnosesService.create(createDiagnosisDto);
  }

  //____________________FINDALL FOR ADMINS AND DOCTORS__________________
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
  @Roles("doctor", "employee")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.diagnosesService.findAll();
  }

  //____________________FINDONE FOR ADMINS AND DOCTORS__________________
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
    type: Diagnosis,
  })
  @ApiResponse({
    status: 404,
    description: "Tashxis topilmadi",
  })
  @Roles("doctor", "employee")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get("admins/:id")
  findOne(@Param("id") id: string) {
    return this.diagnosesService.findOne(+id);
  }

  //____________________UPDATE FOR ADMINS AND DOCTORS___________________
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
  @Roles("doctor", "employee")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateDiagnosisDto: UpdateDiagnosisDto
  ) {
    return this.diagnosesService.update(+id, updateDiagnosisDto);
  }
}
