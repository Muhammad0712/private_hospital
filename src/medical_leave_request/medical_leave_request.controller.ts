import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicalLeaveRequestService } from './medical_leave_request.service';
import { CreateMedicalLeaveRequestDto } from './dto/create-medical_leave_request.dto';
import { UpdateMedicalLeaveRequestDto } from './dto/update-medical_leave_request.dto';

@Controller('medical-leave-request')
export class MedicalLeaveRequestController {
  constructor(private readonly medicalLeaveRequestService: MedicalLeaveRequestService) {}

  @Post()
  create(@Body() createMedicalLeaveRequestDto: CreateMedicalLeaveRequestDto) {
    return this.medicalLeaveRequestService.create(createMedicalLeaveRequestDto);
  }

  @Get()
  findAll() {
    return this.medicalLeaveRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicalLeaveRequestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicalLeaveRequestDto: UpdateMedicalLeaveRequestDto) {
    return this.medicalLeaveRequestService.update(+id, updateMedicalLeaveRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicalLeaveRequestService.remove(+id);
  }
}
