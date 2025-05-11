import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Employee } from './models/employee.models';
import { Roles } from '../common/decorators/roles-auth.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller("employees")
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  //____________________CREATE____________________
  @ApiOperation({
    summary: "Xodim yaratish",
    description: "Yangi xodimni tizimga qo'shish",
  })
  @ApiBody({
    description: "Yangi xodim yaratish uchun kerakli body ma'lumotlari",
    type: CreateEmployeeDto,
  })
  @ApiResponse({
    status: 201,
    description: "Xodim muvaffaqiyatli yaratildi",
  })
  @ApiResponse({
    status: 400,
    description: "Yuborilgan ma'lumotlar noto'g'ri",
  })
  @Roles("employee")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  //____________________FINDALL____________________
  @ApiOperation({
    summary: "Barcha xodimlarni ko'rish",
    description: "Tizimdagi barcha xodimlar ro'yxatini olish",
  })
  @ApiResponse({
    status: 200,
    description: "Barcha xodimlar muvaffaqiyatli olindi",
    type: [Employee], // Bu yerda Employee modeli bilan type ko'rsatiladi
  })
  @ApiResponse({
    status: 404,
    description: "Xodimlar ro'yxati topilmadi",
  })
  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  //____________________FINDONE____________________
  @ApiOperation({
    summary: "Xodimni ID bo'yicha ko'rish",
    description: "Berilgan ID bo'yicha xodimning ma'lumotlarini olish",
  })
  @ApiParam({
    name: "id",
    type: String,
    description: "Ma'lumotlari olinadigan xodimning unikal identifikatori",
  })
  @ApiResponse({
    status: 200,
    description: "Xodim ma'lumotlari muvaffaqiyatli olindi",
    type: Employee,
  })
  @ApiResponse({
    status: 404,
    description: "Xodim topilmadi",
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.employeesService.findOne(+id);
  }

  //____________________UPDATE____________________
  @ApiOperation({
    summary: "Xodim ma'lumotlarini yangilash",
    description: "Berilgan ID bo'yicha xodim ma'lumotlarini yangilash",
  })
  @ApiParam({
    name: "id",
    type: String,
    description: "Yangilanishi kerak bo'lgan xodimning unikal identifikatori",
  })
  @ApiBody({
    description:
      "Xodim ma'lumotlarini yangilash uchun kerakli body ma'lumotlari",
    type: UpdateEmployeeDto,
  })
  @ApiResponse({
    status: 200,
    description: "Xodim ma'lumotlari muvaffaqiyatli yangilandi",
  })
  @ApiResponse({
    status: 404,
    description: "Xodim topilmadi",
  })
  @ApiResponse({
    status: 400,
    description: "Yuborilgan ma'lumotlar noto'g'ri",
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto
  ) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  //____________________REMOVE____________________
  @ApiOperation({
    summary: "Xodimni o'chirish",
    description: "Berilgan ID bo'yicha xodimni o'chirish",
  })
  @ApiParam({
    name: "id",
    type: String,
    description: "O'chirilishi kerak bo'lgan xodimning unikal identifikatori",
  })
  @ApiResponse({
    status: 200,
    description: "Xodim muvaffaqiyatli o'chirildi",
  })
  @ApiResponse({
    status: 404,
    description: "Xodim topilmadi",
  })
  @ApiResponse({
    status: 400,
    description: "O'chirish jarayonida xatolik yuz berdi",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.employeesService.remove(+id);
  }
}
