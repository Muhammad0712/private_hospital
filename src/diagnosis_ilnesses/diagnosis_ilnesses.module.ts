import { Module } from "@nestjs/common";
import { DiagnosisIlnessesService } from "./diagnosis_ilnesses.service";
import { DiagnosisIlnessesController } from "./diagnosis_ilnesses.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { DiagnosisIlness } from "./models/diagnosis_ilness.model";

@Module({
  imports: [SequelizeModule.forFeature([DiagnosisIlness])],
  controllers: [DiagnosisIlnessesController],
  providers: [DiagnosisIlnessesService],
})
export class DiagnosisIlnessesModule {}
