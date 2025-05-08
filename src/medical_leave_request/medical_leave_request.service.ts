import { Injectable } from "@nestjs/common";
import { CreateMedicalLeaveRequestDto } from "./dto/create-medical_leave_request.dto";
import { UpdateMedicalLeaveRequestDto } from "./dto/update-medical_leave_request.dto";
import { InjectModel } from "@nestjs/sequelize";
import { MedicalLeaveRequest } from "./models/medical_leave_request.model";

@Injectable()
export class MedicalLeaveRequestService {
  constructor(
    @InjectModel(MedicalLeaveRequest)
    private readonly medicalLeaveRequestModel: typeof MedicalLeaveRequest
  ) {}
  create(createMedicalLeaveRequestDto: CreateMedicalLeaveRequestDto) {
    return this.medicalLeaveRequestModel.create(createMedicalLeaveRequestDto);
  }

  findAll() {
    return this.medicalLeaveRequestModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.medicalLeaveRequestModel.findByPk(id, { include: { all: true } });
  }

  update(id: number, updateMedicalLeaveRequestDto: UpdateMedicalLeaveRequestDto ) {
    return this.medicalLeaveRequestModel.update(updateMedicalLeaveRequestDto, { where: { id } });
  }

  remove(id: number) {
    return this.medicalLeaveRequestModel.destroy({ where: { id } });
  }
}
