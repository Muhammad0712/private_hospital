import { Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Doctor } from './models/doctor.model';

@Injectable()
export class DoctorsService {
  constructor(@InjectModel(Doctor) private readonly doctorModel: typeof Doctor) {}
  create(createDoctorDto: CreateDoctorDto) {
    return this.doctorModel.create(createDoctorDto);
  }

  findAll() {
    return this.doctorModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.doctorModel.findByPk(id, { include: { all: true } });
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return this.doctorModel.update(updateDoctorDto, { where: { id } });
  }

  remove(id: number) {
    return this.doctorModel.destroy({ where: { id } });
  }
}
