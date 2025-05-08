import { Module } from '@nestjs/common';
import { PrescriptionMedicinesService } from './prescription_medicines.service';
import { PrescriptionMedicinesController } from './prescription_medicines.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PrescriptionMedicine } from './models/prescription_medicine.model';

@Module({
  imports: [SequelizeModule.forFeature([PrescriptionMedicine])],
  controllers: [PrescriptionMedicinesController],
  providers: [PrescriptionMedicinesService],
})
export class PrescriptionMedicinesModule {}
