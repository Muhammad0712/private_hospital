import { Injectable } from '@nestjs/common';
import { CreatePrescriptionMedicineDto } from './dto/create-prescription_medicine.dto';
import { UpdatePrescriptionMedicineDto } from './dto/update-prescription_medicine.dto';
import { InjectModel } from '@nestjs/sequelize';
import { PrescriptionMedicine } from './models/prescription_medicine.model';

@Injectable()
export class PrescriptionMedicinesService {
  constructor(@InjectModel(PrescriptionMedicine) private readonly prescriptionMedicineModel: typeof PrescriptionMedicine) {}
  create(createPrescriptionMedicineDto: CreatePrescriptionMedicineDto) {
    return this.prescriptionMedicineModel.create(createPrescriptionMedicineDto);
  }

  findAll() {
    return this.prescriptionMedicineModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.prescriptionMedicineModel.findByPk(id, { include: { all: true } });
  }

  update(id: number, updatePrescriptionMedicineDto: UpdatePrescriptionMedicineDto) {
    return this.prescriptionMedicineModel.update(updatePrescriptionMedicineDto, { where: { id } });
  }

  remove(id: number) {
    return this.prescriptionMedicineModel.destroy({ where: { id } });
  }
}
