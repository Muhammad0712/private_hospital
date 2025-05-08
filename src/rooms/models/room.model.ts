import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { EmployeeRoom } from "../../employee_rooms/models/employee_room.models";
import { Employee } from "../../employees/models/employee.models";
import { Doctor } from "../../doctors/models/doctor.model";
import { DoctorRoom } from "../../doctor_rooms/models/doctor_room.model";

interface IRoomCreationAttr {
    room_number: number;
    room_type: string;
    is_busy: boolean;
    status: string;
    under_repair: boolean;
}

@Table({tableName: "rooms", timestamps: false})
export class Room extends Model<Room, IRoomCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare room_number: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare room_type: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  declare is_busy: boolean;

  @Column({
    type: DataType.ENUM("new", "average", "repaired"),
    allowNull: false,
  })
  declare status: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  declare under_repair: boolean;

  @BelongsToMany(() => Employee, () => EmployeeRoom)
  employees: Employee[];

  @BelongsToMany(()=> Doctor, () => DoctorRoom)
  doctors: Doctor[];
}
