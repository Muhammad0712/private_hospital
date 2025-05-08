import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Patient } from './models/patient.model';

@Injectable()
export class PatientsService {
  constructor(@InjectModel(Patient) private readonly patientModel: typeof Patient) {}
  create(createPatientDto: CreatePatientDto) {
    return this.patientModel.create(createPatientDto);
  }

  findAll() {
    return this.patientModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.patientModel.findByPk(id);
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return this.patientModel.update(updatePatientDto, { where: { id } });
  }

  remove(id: number) {
    return this.patientModel.destroy({ where: { id } });
  }
}
