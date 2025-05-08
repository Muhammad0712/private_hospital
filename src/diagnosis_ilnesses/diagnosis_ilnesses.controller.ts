import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiagnosisIlnessesService } from './diagnosis_ilnesses.service';
import { CreateDiagnosisIlnessDto } from './dto/create-diagnosis_ilness.dto';
import { UpdateDiagnosisIlnessDto } from './dto/update-diagnosis_ilness.dto';

@Controller('diagnosis-ilnesses')
export class DiagnosisIlnessesController {
  constructor(private readonly diagnosisIlnessesService: DiagnosisIlnessesService) {}

  @Post()
  create(@Body() createDiagnosisIlnessDto: CreateDiagnosisIlnessDto) {
    return this.diagnosisIlnessesService.create(createDiagnosisIlnessDto);
  }

  @Get()
  findAll() {
    return this.diagnosisIlnessesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diagnosisIlnessesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiagnosisIlnessDto: UpdateDiagnosisIlnessDto) {
    return this.diagnosisIlnessesService.update(+id, updateDiagnosisIlnessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diagnosisIlnessesService.remove(+id);
  }
}
