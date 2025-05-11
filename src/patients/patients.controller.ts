import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from "@nestjs/common";
import { PatientsService } from "./patients.service";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { Patient } from "./models/patient.model";

@Controller("patients")
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  //_______________________________________CREATE_____________________________________________

  @ApiOperation({ summary: "Yangi bemor qo'sish" })
  @ApiResponse({ status: 201, type: CreatePatientDto })
  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  //_______________________________________FINDALL____________________________________________
  @ApiOperation({
    summary: "Barcha bemorlarni olish",
    description:
      "Bu endpoint barcha bemorlar ro‘yxatini olish uchun ishlatiladi.",
  })
  @ApiResponse({
    status: 200,
    description: "Bemorlar ro‘yxati muvaffaqiyatli qaytarildi.",
    type: [Patient],
  })
  @ApiResponse({
    status: 400,
    description: "So‘rovni bajarishda xatolik yuz berdi.",
  })
  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  //______________________________________FINDBYLINK____________________________________________
  @ApiOperation({
    summary: "Bemorni faollashtirish uchun linkni yuborish",
    description:
      "Bu endpoint bemor hisobini faollashtirish uchun yagona aktivatsiya linkidan foydalaniladi.",
  })
  @ApiParam({
    name: "link",
    description: "Bemor hisobini faollashtirish uchun yagona aktivatsiya linki",
    type: Patient,
  })
  @ApiResponse({
    status: 200,
    description: "Bemor hisobini muvaffaqiyatli faollashtirildi.",
  })
  @ApiResponse({
    status: 400,
    description: "Link noto‘g‘ri yoki muddati o‘tgan.",
  })
  @Get("activate/:link")
  findByLink(@Param("link") link: string) {
    return this.patientsService.activateLink(link);
  }

  //_____________________________________FINDONE________________________________________________
  @ApiOperation({
    summary: "ID bo'yicha bemorni olish",
    description: "Berilgan ID bo'yicha bemor ma'lumotlarini olish",
  })
  @ApiParam({
    name: "id",
    type: String,
    description: "Bemorning unikal identifikatori",
  })
  @ApiResponse({
    status: 200,
    description: "Bemor muvaffaqiyatli topildi",
    type: Patient,
  })
  @ApiResponse({
    status: 404,
    description: "Bemor topilmadi",
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.patientsService.findOne(+id);
  }

  //_____________________________________UPDATE_________________________________________________
  @ApiOperation({
    summary: "Bemorni yangilash",
    description: "Berilgan ID bo'yicha bemorning ma'lumotlarini yangilash",
  })
  @ApiParam({
    name: "id",
    type: String,
    description: "Yangilanishi kerak bo'lgan bemorning unikal identifikatori",
  })
  @ApiBody({
    description:
      "Bemor ma'lumotlarini yangilash uchun kerakli body ma'lumotlari",
    type: UpdatePatientDto,
  })
  @ApiResponse({
    status: 200,
    description: "Bemor muvaffaqiyatli yangilandi",
  })
  @ApiResponse({
    status: 404,
    description: "Bemor topilmadi",
  })
  @ApiResponse({
    status: 400,
    description: "Yuborilgan ma'lumotlar noto'g'ri",
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(+id, updatePatientDto);
  }

  //_____________________________________DELETE_________________________________________________
  @ApiOperation({
    summary: "Bemorni o'chirish",
    description: "Berilgan ID bo'yicha bemorni o'chirish",
  })
  @ApiParam({
    name: "id",
    type: String,
    description: "O'chirilishi kerak bo'lgan bemorning unikal identifikatori",
  })
  @ApiResponse({
    status: 200,
    description: "Bemor muvaffaqiyatli o'chirildi",
  })
  @ApiResponse({
    status: 404,
    description: "Bemor topilmadi",
  })
  @ApiResponse({
    status: 400,
    description: "Yuborilgan ma'lumotlar noto'g'ri",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.patientsService.remove(+id);
  }
}
