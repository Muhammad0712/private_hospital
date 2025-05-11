import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IllnessService } from './illness.service';
import { CreateIllnessDto } from './dto/create-illness.dto';
import { UpdateIllnessDto } from './dto/update-illness.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Illness } from './models/illness.model';

@Controller("illness")
export class IllnessController {
  constructor(private readonly illnessService: IllnessService) {}

  //____________________CREATE____________________
  @ApiOperation({
    summary: "Kasallik yaratish",
    description:
      "Yangi kasallikni yaratish uchun kerakli ma'lumotlarni yuborish",
  })
  @ApiBody({
    description: "Yangi kasallik yaratish uchun kerakli body ma'lumotlari",
    type: CreateIllnessDto,
  })
  @ApiResponse({
    status: 201,
    description: "Kasallik muvaffaqiyatli yaratildi",
  })
  @ApiResponse({
    status: 400,
    description: "Yuborilgan ma'lumotlar noto'g'ri",
  })
  @Post()
  create(@Body() createIllnessDto: CreateIllnessDto) {
    return this.illnessService.create(createIllnessDto);
  }

  //____________________FINDALL____________________
  @ApiOperation({
    summary: "Kasalliklarni olish",
    description: "Barcha mavjud kasalliklarni olish",
  })
  @ApiResponse({
    status: 200,
    type: [Illness],
    description: "Kasalliklar muvaffaqiyatli qaytarildi",
  })
  @ApiResponse({
    status: 404,
    description: "Kasalliklar topilmadi",
  })
  @Get()
  findAll() {
    return this.illnessService.findAll();
  }

  //____________________FINDONE____________________
  @ApiOperation({
    summary: "Kasallikni ID bo'yicha olish",
    description: "Berilgan ID bo'yicha kasallikni olish",
  })
  @ApiParam({
    name: "id",
    type: String,
    description: "Kasallikni topish uchun kerakli unikal identifikator",
  })
  @ApiResponse({
    status: 200,
    type: Illness,
    description: "Kasallik muvaffaqiyatli qaytarildi",
  })
  @ApiResponse({
    status: 404,
    description: "Kasallik topilmadi",
  })
  @ApiResponse({
    status: 400,
    description: "Noto‘g‘ri ID formatida so‘rov yuborildi",
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.illnessService.findOne(+id);
  }

  //____________________UPDATE____________________
  @ApiOperation({
    summary: "Kasallikni yangilash",
    description: "Berilgan ID bo'yicha kasallikni yangilash",
  })
  @ApiParam({
    name: "id",
    type: String,
    description:
      "Yangilanishi kerak bo‘lgan kasallikning unikal identifikatori",
  })
  @ApiBody({
    description:
      "Kasallik ma'lumotlarini yangilash uchun kerakli body ma'lumotlari",
    type: UpdateIllnessDto,
  })
  @ApiResponse({
    status: 200,
    type: UpdateIllnessDto,
    description: "Kasallik muvaffaqiyatli yangilandi",
  })
  @ApiResponse({
    status: 404,
    description: "Kasallik topilmadi",
  })
  @ApiResponse({
    status: 400,
    description: "Yuborilgan ma'lumotlar noto‘g‘ri",
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateIllnessDto: UpdateIllnessDto) {
    return this.illnessService.update(+id, updateIllnessDto);
  }

  //____________________REMOVE____________________
  @ApiOperation({
    summary: "Kasallikni o'chirish",
    description: "Berilgan ID bo'yicha kasallikni o'chirish",
  })
  @ApiParam({
    name: "id",
    type: String,
    description:
      "O'chirilishi kerak bo'lgan kasallikning unikal identifikatori",
  })
  @ApiResponse({
    status: 200,
    description: "Kasallik muvaffaqiyatli o'chirildi",
  })
  @ApiResponse({
    status: 404,
    description: "Kasallik topilmadi",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.illnessService.remove(+id);
  }
}
