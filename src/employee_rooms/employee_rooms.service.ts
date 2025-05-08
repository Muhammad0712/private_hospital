import { Injectable } from '@nestjs/common';
import { CreateEmployeeRoomDto } from './dto/create-employee_room.dto';
import { UpdateEmployeeRoomDto } from './dto/update-employee_room.dto';
import { InjectModel } from '@nestjs/sequelize';
import { EmployeeRoom } from './models/employee_room.models';

@Injectable()
export class EmployeeRoomsService {
  constructor(@InjectModel(EmployeeRoom) private readonly employeeRoomModel: typeof EmployeeRoom) {}
  create(createEmployeeRoomDto: CreateEmployeeRoomDto) {
    return this.employeeRoomModel.create(createEmployeeRoomDto);
  }

  findAll() {
    return this.employeeRoomModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.employeeRoomModel.findByPk(id, { include: { all: true } });
  }

  update(id: number, updateEmployeeRoomDto: UpdateEmployeeRoomDto) {
    return this.employeeRoomModel.update(updateEmployeeRoomDto, { where: { id } });
  }

  remove(id: number) {
    return this.employeeRoomModel.destroy({ where: { id } });
  }
}
