import { Injectable } from '@nestjs/common';
import { CreateDiagnosisDto } from './dto/create-diagnosis.dto';
import { UpdateDiagnosisDto } from './dto/update-diagnosis.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Diagnosis } from './models/diagnosis.model';

@Injectable()
export class DiagnosesService {
  constructor(@InjectModel(Diagnosis) private readonly diagnosisModel: typeof Diagnosis) {}
  create(createDiagnosisDto: CreateDiagnosisDto) {
    return this.diagnosisModel.create(createDiagnosisDto);
  }

  findAll() {
    return this.diagnosisModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.diagnosisModel.findByPk(id, { include: { all: true } });
  }

  update(id: number, updateDiagnosisDto: UpdateDiagnosisDto) {
    return this.diagnosisModel.update(updateDiagnosisDto, { where: { id } });
  }

  remove(id: number) {
    return this.diagnosisModel.destroy({ where: { id } });
  }
}
