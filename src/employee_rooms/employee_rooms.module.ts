import { Module } from '@nestjs/common';
import { EmployeeRoomsService } from './employee_rooms.service';
import { EmployeeRoomsController } from './employee_rooms.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmployeeRoom } from './models/employee_room.models';

@Module({
  imports: [SequelizeModule.forFeature([EmployeeRoom])],
  controllers: [EmployeeRoomsController],
  providers: [EmployeeRoomsService],
  exports: [EmployeeRoomsService],
})
export class EmployeeRoomsModule {}
