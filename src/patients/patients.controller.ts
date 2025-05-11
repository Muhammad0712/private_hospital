import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { SignInDto } from '../auth/dto/sign-in.dto';
import { Response } from 'express';
import { AuthService } from '../auth/auth.service';

@Controller("patients")
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @Get("activate/:link")
  findByLink(@Param("link") link: string) {
    return this.patientsService.activateLink(link);
  }
  
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.patientsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(+id, updatePatientDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.patientsService.remove(+id);
  }
}
