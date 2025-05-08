import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorAppointmentDto } from './create-doctor_appointment.dto';

export class UpdateDoctorAppointmentDto extends PartialType(CreateDoctorAppointmentDto) {}
