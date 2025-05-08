import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeRoomDto } from './create-employee_room.dto';

export class UpdateEmployeeRoomDto extends PartialType(CreateEmployeeRoomDto) {}
