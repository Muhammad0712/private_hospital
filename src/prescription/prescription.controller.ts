import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PrescriptionService } from './prescription.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Prescription } from './models/prescription.model';
import { Roles } from '../common/decorators/roles-auth.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller("prescription")
export class PrescriptionController {
  constructor(private readonly prescriptionService: PrescriptionService) {}

  //____________________CREATE____________________
  @ApiOperation({
    summary: "Retsept yaratish",
    description:
      "Yangi retseptni yaratish uchun kerakli ma'lumotlarni yuborish",
  })
  @ApiBody({
    description: "Yangi retsept yaratish uchun kerakli body ma'lumotlari",
    type: CreatePrescriptionDto,
  })
  @ApiResponse({
    status: 201,
    description: "Retsept muvaffaqiyatli yaratildi",
  })
  @ApiResponse({
    status: 400,
    description: "Yuborilgan ma'lumotlar noto'g'ri",
  })
  @ApiResponse({
    status: 500,
    description: "Server xatoligi",
  })
  @Roles("employee", "doctor")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescriptionService.create(createPrescriptionDto);
  }

  //____________________FINDALL____________________
  @ApiOperation({
    summary: "Barcha retseptlarni olish",
    description: "Ma'lumotlar bazasidan barcha retseptlarni olish",
  })
  @ApiResponse({
    status: 200,
    description: "Barcha retseptlar muvaffaqiyatli olindi",
    type: [Prescription], // [Prescription] ni o'zingizning modelingiz nomi bilan almashtiring
  })
  @ApiResponse({
    status: 500,
    description: "Server xatoligi",
  })
  @Roles("employee", "doctor")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.prescriptionService.findAll();
  }

  //____________________FINDONE____________________
  @ApiOperation({
    summary: "Bitta retseptni olish",
    description: "Berilgan ID bo'yicha retseptni olish",
  })
  @ApiParam({
    name: "id",
    type: String,
    description: "Olmoqchi bo'lgan retseptning unikal identifikatori",
  })
  @ApiResponse({
    status: 200,
    description: "Retsept muvaffaqiyatli topildi",
    type: Prescription, // Prescription modelining nomini o'zgartiring
  })
  @ApiResponse({
    status: 404,
    description: "Retsept topilmadi",
  })
  @ApiResponse({
    status: 500,
    description: "Server xatoligi",
  })
  @Roles("employee", "doctor")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.prescriptionService.findOne(+id);
  }

  //____________________UPDATE____________________
  @ApiOperation({
    summary: "Retseptni yangilash",
    description: "Berilgan ID bo'yicha retseptni yangilash",
  })
  @ApiParam({
    name: "id",
    type: String,
    description: "Yangilanishi kerak bo'lgan retseptning unikal identifikatori",
  })
  @ApiBody({
    description: "Yangilanishi kerak bo\'lgan retsept ma'lumotlari",
    type: UpdatePrescriptionDto,
  })
  @ApiResponse({
    status: 200,
    description: "Retsept muvaffaqiyatli yangilandi",
    type: Prescription, // Prescription modelining nomini o'zgartiring
  })
  @ApiResponse({
    status: 404,
    description: "Retsept topilmadi",
  })
  @ApiResponse({
    status: 400,
    description: "Yuborilgan ma'lumotlar noto'g'ri",
  })
  @ApiResponse({
    status: 500,
    description: "Server xatoligi",
  })
  @Roles("employee", "doctor")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatePrescriptionDto: UpdatePrescriptionDto
  ) {
    return this.prescriptionService.update(+id, updatePrescriptionDto);
  }

  //____________________REMOVE____________________
  @ApiOperation({
    summary: "Retseptni o'chirish",
    description: "Berilgan ID bo'yicha retseptni o'chirish",
  })
  @ApiParam({
    name: "id",
    type: String,
    description: "O'chirilishi kerak bo'lgan retseptning unikal identifikatori",
  })
  @ApiResponse({
    status: 200,
    description: "Retsept muvaffaqiyatli o'chirildi",
  })
  @ApiResponse({
    status: 404,
    description: "Retsept topilmadi",
  })
  @ApiResponse({
    status: 400,
    description: "Yuborilgan ma'lumotlar noto'g'ri",
  })
  @ApiResponse({
    status: 500,
    description: "Server xatoligi",
  })
  @Roles("employee", "doctor")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.prescriptionService.remove(+id);
  }
}
