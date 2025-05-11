import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  ServiceUnavailableException,
} from "@nestjs/common";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Patient } from "./models/patient.model";
import { MailService } from "../mail/mail.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient)
    private readonly patientModel: typeof Patient,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    const { password, confirm_password } = createPatientDto;
    if (password !== confirm_password) {
      throw new BadRequestException("Parollar mos emas!");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    const newUser = await this.patientModel.create({
      ...createPatientDto,
      password: hashed_password,
    });

    try {
      await this.mailService.sendMail(newUser);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException("Emailga xat yuborishda xatolik");
    }
    return newUser;
  }

  async findAll() {
    const patients = await this.patientModel.findAll({
      include: { all: true },
    });
    return patients;
  }

  findOne(id: number) {
    return this.patientModel.findByPk(id);
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return this.patientModel.update(updatePatientDto, { where: { id } });
  }

  remove(id: number) {
    return this.patientModel.destroy({ where: { id } });
  }

  findUserByEmail(email: string) {
    return this.patientModel.findOne({ where: { email } });
  }

  async activateLink(link: string) {
    console.log(link);
    if (!link) {
      throw new BadRequestException("Activation link not found!");
    }
    const affectedCount = await this.patientModel.update(
      { is_active: true },
      { where: { activation_link: link } }
    );
    console.log(affectedCount);
    if (affectedCount[0] === 0) {
      throw new BadRequestException("User not found!");
    }
    return {
      message: "User activated succesfully!",
    };
  }

  async updateRefreshToken(id: number, refresh_token: string) {
    const updatedUser = await this.patientModel.update(
      { refresh_token },
      { where: { id } }
    );
    return updatedUser;
  }
}
