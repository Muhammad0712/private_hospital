import { Module } from '@nestjs/common';
import { DoctorRoomsService } from './doctor_rooms.service';
import { DoctorRoomsController } from './doctor_rooms.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DoctorRoom } from './models/doctor_room.model';

@Module({
  imports: [SequelizeModule.forFeature([DoctorRoom])],
  controllers: [DoctorRoomsController],
  providers: [DoctorRoomsService],
})
export class DoctorRoomsModule {}
