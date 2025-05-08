import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicalLeaveRequestDto } from './create-medical_leave_request.dto';

export class UpdateMedicalLeaveRequestDto extends PartialType(CreateMedicalLeaveRequestDto) {}
