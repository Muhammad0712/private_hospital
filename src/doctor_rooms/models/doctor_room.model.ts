import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Doctor } from "../../doctors/models/doctor.model";
import { Room } from "../../rooms/models/room.model";

interface IDoctorRoomCreationAttr {
  doctorId: number;
  roomId: number;
}

@Table({ tableName: "doctor_rooms", timestamps: false })
export class DoctorRoom extends Model<DoctorRoom, IDoctorRoomCreationAttr> {
  @ForeignKey(() => Doctor)
  @Column({
    type: DataType.INTEGER,
  })
  declare doctorId: number;

  @ForeignKey(() => Room)
  @Column({
    type: DataType.INTEGER,
  })
  declare roomId: number;

  @BelongsTo(() => Doctor)
  doctor: Doctor;

  @BelongsTo(() => Room)
  room: Room;
}
