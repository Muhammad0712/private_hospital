import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DoctorAppointmentService } from './doctor_appointment.service';
import { CreateDoctorAppointmentDto } from './dto/create-doctor_appointment.dto';
import { UpdateDoctorAppointmentDto } from './dto/update-doctor_appointment.dto';

@Controller('doctor-appointment')
export class DoctorAppointmentController {
  constructor(private readonly doctorAppointmentService: DoctorAppointmentService) {}

  @Post()
  create(@Body() createDoctorAppointmentDto: CreateDoctorAppointmentDto) {
    return this.doctorAppointmentService.create(createDoctorAppointmentDto);
  }

  @Get()
  findAll() {
    return this.doctorAppointmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorAppointmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorAppointmentDto: UpdateDoctorAppointmentDto) {
    return this.doctorAppointmentService.update(+id, updateDoctorAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorAppointmentService.remove(+id);
  }
}
