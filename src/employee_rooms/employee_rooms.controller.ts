import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeRoomsService } from './employee_rooms.service';
import { CreateEmployeeRoomDto } from './dto/create-employee_room.dto';
import { UpdateEmployeeRoomDto } from './dto/update-employee_room.dto';

@Controller('employee-rooms')
export class EmployeeRoomsController {
  constructor(private readonly employeeRoomsService: EmployeeRoomsService) {}

  @Post()
  create(@Body() createEmployeeRoomDto: CreateEmployeeRoomDto) {
    return this.employeeRoomsService.create(createEmployeeRoomDto);
  }

  @Get()
  findAll() {
    return this.employeeRoomsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeRoomsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeRoomDto: UpdateEmployeeRoomDto) {
    return this.employeeRoomsService.update(+id, updateEmployeeRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeRoomsService.remove(+id);
  }
}
