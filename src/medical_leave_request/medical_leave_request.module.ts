import { Module } from '@nestjs/common';
import { MedicalLeaveRequestService } from './medical_leave_request.service';
import { MedicalLeaveRequestController } from './medical_leave_request.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MedicalLeaveRequest } from './models/medical_leave_request.model';

@Module({
  imports: [SequelizeModule.forFeature([MedicalLeaveRequest])],
  controllers: [MedicalLeaveRequestController],
  providers: [MedicalLeaveRequestService],
})
export class MedicalLeaveRequestModule {}
