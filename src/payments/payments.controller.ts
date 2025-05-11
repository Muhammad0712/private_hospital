import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Payment } from './models/payment.model';

@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  //____________________CREATE______________________
  @ApiOperation({
    summary: "To'lov qo'shish",
    description: "Yangi to'lov ma'lumotlarini yaratish",
  })
  @ApiBody({
    description: "Yaratilishi kerak bo'lgan to'lov ma'lumotlari",
    type: CreatePaymentDto,
  })
  @ApiResponse({
    status: 201,
    description: "To'lov muvaffaqiyatli yaratildi",
  })
  @ApiResponse({
    status: 400,
    description: "Yuborilgan ma'lumotlar noto'g'ri",
  })
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  //____________________FINDALL______________________
  @ApiOperation({
    summary: "Barcha to'lovlarni olish",
    description: "Tizimdagi barcha mavjud to'lov yozuvlarini olish",
  })
  @ApiResponse({
    status: 200,
    description: "To'lovlar muvaffaqiyatli qaytarildi",
    type: [Payment]
  })
  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  //____________________FINDONE______________________
  @ApiOperation({
    summary: "Bitta to'lovni olish",
    description: "Berilgan ID bo'yicha yagona to'lov ma'lumotini olish",
  })
  @ApiParam({
    name: "id",
    type: String,
    description: "To'lovni aniqlovchi unikal identifikator",
  })
  @ApiResponse({
    status: 200,
    type: Payment,
    description: "To'lov muvaffaqiyatli topildi",
  })
  @ApiResponse({
    status: 404,
    description: "To'lov topilmadi",
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.paymentsService.findOne(+id);
  }

  //____________________UPDATE______________________
  @ApiOperation({
    summary: "To'lovni yangilash",
    description: "Berilgan ID bo'yicha to'lov ma'lumotlarini yangilash",
  })
  @ApiParam({
    name: "id",
    type: String,
    description: "Yangilanishi kerak bo'lgan to'lovning unikal identifikatori",
  })
  @ApiBody({
    description: "To'lovni yangilash uchun yuborilgan ma'lumotlar",
    type: UpdatePaymentDto,
  })
  @ApiResponse({
    status: 200,
    description: "To'lov muvaffaqiyatli yangilandi",
    type: UpdatePaymentDto
  })
  @ApiResponse({
    status: 404,
    description: "To'lov topilmadi",
  })
  @ApiResponse({
    status: 400,
    description: "Yuborilgan ma'lumotlar noto'g'ri",
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  //____________________REMOVE______________________
  @ApiOperation({
    summary: "To'lovni o'chirish",
    description: "Berilgan ID bo'yicha to'lovni tizimdan o'chirish",
  })
  @ApiParam({
    name: "id",
    type: String,
    description: "O'chirilishi kerak bo'lgan to'lovning unikal identifikatori",
  })
  @ApiResponse({
    status: 200,
    description: "To'lov muvaffaqiyatli o'chirildi",
  })
  @ApiResponse({
    status: 404,
    description: "To'lov topilmadi",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.paymentsService.remove(+id);
  }
}
