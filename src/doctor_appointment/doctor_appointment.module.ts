import { Module } from '@nestjs/common';
import { DoctorAppointmentService } from './doctor_appointment.service';
import { DoctorAppointmentController } from './doctor_appointment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DoctorAppointment } from './models/doctor_appointment.models';

@Module({
  imports: [SequelizeModule.forFeature([DoctorAppointment])],
  controllers: [DoctorAppointmentController],
  providers: [DoctorAppointmentService],
})
export class DoctorAppointmentModule {}
