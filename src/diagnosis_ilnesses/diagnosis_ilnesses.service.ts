import { Injectable } from '@nestjs/common';
import { CreateDiagnosisIlnessDto } from './dto/create-diagnosis_ilness.dto';
import { UpdateDiagnosisIlnessDto } from './dto/update-diagnosis_ilness.dto';
import { InjectModel } from '@nestjs/sequelize';
import { DiagnosisIlness } from './models/diagnosis_ilness.model';

@Injectable()
export class DiagnosisIlnessesService {
  constructor(@InjectModel(DiagnosisIlness) private readonly diagnosisIlnessModel: typeof DiagnosisIlness) {}
  create(createDiagnosisIlnessDto: CreateDiagnosisIlnessDto) {
    return this.diagnosisIlnessModel.create(createDiagnosisIlnessDto);
  }

  findAll() {
    return this.diagnosisIlnessModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.diagnosisIlnessModel.findByPk(id, { include: { all: true } });
  }

  update(id: number, updateDiagnosisIlnessDto: UpdateDiagnosisIlnessDto) {
    return this.diagnosisIlnessModel.update(updateDiagnosisIlnessDto, { where: { id } });
  }

  remove(id: number) {
    return this.diagnosisIlnessModel.destroy({ where: { id } });
  }
}
