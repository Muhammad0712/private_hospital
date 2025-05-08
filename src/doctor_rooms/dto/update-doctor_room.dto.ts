import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorRoomDto } from './create-doctor_room.dto';

export class UpdateDoctorRoomDto extends PartialType(CreateDoctorRoomDto) {}
