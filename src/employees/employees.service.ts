import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from './models/employee.models';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee) private readonly employeeModel: typeof Employee
  ) {}
  async create(createEmployeeDto: CreateEmployeeDto) {
    const { password } = createEmployeeDto;
    const hashed_password = await bcrypt.hash(password, 7);
    const newUser = await this.employeeModel.create({
      ...createEmployeeDto,
      password: hashed_password,
      is_active: true,
    });
    return newUser;
  }

  findAll() {
    return this.employeeModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.employeeModel.findByPk(id, { include: { all: true } });
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeModel.update(updateEmployeeDto, { where: { id } });
  }

  remove(id: number) {
    return this.employeeModel.destroy({ where: { id } });
  }
  findUserByEmail(email: string) {
    return this.employeeModel.findOne({ where: { email } });
  }

  async updateRefreshToken(id: number, refresh_token: string) {
    const updatedUser = await this.employeeModel.update(
      { refresh_token },
      { where: { id } }
    );
    return updatedUser;
  }
}
