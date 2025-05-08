import { Injectable } from '@nestjs/common';
import { CreateDoctorAppointmentDto } from './dto/create-doctor_appointment.dto';
import { UpdateDoctorAppointmentDto } from './dto/update-doctor_appointment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { DoctorAppointment } from './models/doctor_appointment.models';

@Injectable()
export class DoctorAppointmentService {
  constructor(@InjectModel(DoctorAppointment) private readonly doctorAppointmentModel: typeof DoctorAppointment) {}
  create(createDoctorAppointmentDto: CreateDoctorAppointmentDto) {
    return this.doctorAppointmentModel.create(createDoctorAppointmentDto);
  }

  findAll() {
    return this.doctorAppointmentModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.doctorAppointmentModel.findByPk(id, { include: { all: true } });
  }

  update(id: number, updateDoctorAppointmentDto: UpdateDoctorAppointmentDto) {
    return this.doctorAppointmentModel.update(updateDoctorAppointmentDto, { where: { id } });
  }

  remove(id: number) {
    return this.doctorAppointmentModel.destroy({ where: { id } });
  }
}
