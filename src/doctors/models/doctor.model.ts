import { BelongsTo, BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Room } from "../../rooms/models/room.model";
import { DoctorRoom } from "../../doctor_rooms/models/doctor_room.model";

interface IDoctorCreationAttr {
    first_name: string;
    last_name: string;
    birth_day: Date;
    diploma: string;
    speciality: string;
    work_rate: number;
    salary: number;
    email: string;
    password: string;
    is_active: boolean;
    refresh_token: string;
}

@Table({ tableName: "doctors", timestamps: false })
export class Doctor extends Model<Doctor, IDoctorCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare first_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare last_name: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare birth_day: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare diploma: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare speciality: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare work_rate: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare salary: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  declare is_active: boolean;

  @Column({
    type: DataType.STRING,
    defaultValue: "",
  })
  declare refresh_token: string;

  @Column({
    type: DataType.STRING,
    defaultValue: "doctor",
  })
  declare role: string;

  @BelongsToMany(() => Room, () => DoctorRoom)
  rooms: Room[];
}
