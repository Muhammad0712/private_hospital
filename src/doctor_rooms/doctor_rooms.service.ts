import { Injectable } from '@nestjs/common';
import { CreateDoctorRoomDto } from './dto/create-doctor_room.dto';
import { UpdateDoctorRoomDto } from './dto/update-doctor_room.dto';
import { InjectModel } from '@nestjs/sequelize';
import { DoctorRoom } from './models/doctor_room.model';

@Injectable()
export class DoctorRoomsService {
  constructor(@InjectModel(DoctorRoom) private readonly doctorRoomModel: typeof DoctorRoom) {}
  create(createDoctorRoomDto: CreateDoctorRoomDto) {
    return this.doctorRoomModel.create(createDoctorRoomDto);
  }

  findAll() {
    return this.doctorRoomModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.doctorRoomModel.findByPk(id, { include: { all: true } });
  }

  update(id: number, updateDoctorRoomDto: UpdateDoctorRoomDto) {
    return this.doctorRoomModel.update(updateDoctorRoomDto, { where: { id } });
  }

  remove(id: number) {
    return this.doctorRoomModel.destroy({ where: { id } });
  }
}
