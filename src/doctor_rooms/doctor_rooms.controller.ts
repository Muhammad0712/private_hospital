import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DoctorRoomsService } from './doctor_rooms.service';
import { CreateDoctorRoomDto } from './dto/create-doctor_room.dto';
import { UpdateDoctorRoomDto } from './dto/update-doctor_room.dto';

@Controller('doctor-rooms')
export class DoctorRoomsController {
  constructor(private readonly doctorRoomsService: DoctorRoomsService) {}

  @Post()
  create(@Body() createDoctorRoomDto: CreateDoctorRoomDto) {
    return this.doctorRoomsService.create(createDoctorRoomDto);
  }

  @Get()
  findAll() {
    return this.doctorRoomsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorRoomsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorRoomDto: UpdateDoctorRoomDto) {
    return this.doctorRoomsService.update(+id, updateDoctorRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorRoomsService.remove(+id);
  }
}
