import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrescriptionMedicinesService } from './prescription_medicines.service';
import { CreatePrescriptionMedicineDto } from './dto/create-prescription_medicine.dto';
import { UpdatePrescriptionMedicineDto } from './dto/update-prescription_medicine.dto';

@Controller('prescription-medicines')
export class PrescriptionMedicinesController {
  constructor(private readonly prescriptionMedicinesService: PrescriptionMedicinesService) {}

  @Post()
  create(@Body() createPrescriptionMedicineDto: CreatePrescriptionMedicineDto) {
    return this.prescriptionMedicinesService.create(createPrescriptionMedicineDto);
  }

  @Get()
  findAll() {
    return this.prescriptionMedicinesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prescriptionMedicinesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrescriptionMedicineDto: UpdatePrescriptionMedicineDto) {
    return this.prescriptionMedicinesService.update(+id, updatePrescriptionMedicineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prescriptionMedicinesService.remove(+id);
  }
}
