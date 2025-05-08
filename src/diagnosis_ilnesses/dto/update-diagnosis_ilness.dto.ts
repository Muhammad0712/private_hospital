import { PartialType } from '@nestjs/mapped-types';
import { CreateDiagnosisIlnessDto } from './create-diagnosis_ilness.dto';

export class UpdateDiagnosisIlnessDto extends PartialType(CreateDiagnosisIlnessDto) {}
