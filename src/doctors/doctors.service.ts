import { Injectable } from "@nestjs/common";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { UpdateDoctorDto } from "./dto/update-doctor.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Doctor } from "./models/doctor.model";
import * as bcrypt from "bcrypt";

@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel(Doctor) private readonly doctorModel: typeof Doctor
  ) {}
  async create(createDoctorDto: CreateDoctorDto) {
    const { password } = createDoctorDto;
    const hashed_password = await bcrypt.hash(password, 7);
    const newUser = await this.doctorModel.create({
      ...createDoctorDto,
      password: hashed_password,
    });
    return newUser;
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

  findUserByEmail(email: string) {
    return this.doctorModel.findOne({ where: { email } });
  }

  async updateRefreshToken(id: number, refresh_token: string) {
    const updatedUser = await this.doctorModel.update(
      { refresh_token },
      { where: { id } }
    );
    return updatedUser;
  }
}
