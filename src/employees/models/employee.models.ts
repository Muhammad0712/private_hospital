import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import { EmployeeRoom } from "../../employee_rooms/models/employee_room.models";
import { Room } from "../../rooms/models/room.model";

interface IEmployeeCreationAttr {
    first_name: string;
    last_name: string;
    birth_day: Date;
    gender: string;
    passport_series: string;
    passport_number: string;
    position: string;
    work_rate: number;
    email: string;
    password: string;
    refresh_token: string;
    is_admin: boolean;
    is_creator: boolean;
    is_active: boolean;
}

@Table({ tableName: "employees", updatedAt: false })
export class Employee extends Model<Employee, IEmployeeCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
  })
  declare first_name: string;

  @Column({
    type: DataType.STRING,
  })
  declare last_name: string;

  @Column({
    type: DataType.DATE,
  })
  declare birth_day: Date;

  @Column({
    type: DataType.ENUM("male", "female"),
  })
  declare gender: string;

  @Column({
    type: DataType.STRING,
  })
  declare passport_series: string;

  @Column({
    type: DataType.STRING,
  })
  declare passport_number: string;

  @Column({
    type: DataType.STRING,
  })
  declare position: string;

  @Column({
    type: DataType.INTEGER,
  })
  declare work_rate: number;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
    defaultValue: "",
  })
  declare refresh_token: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_admin: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_creator: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  declare is_active: boolean;

  @Column({
    type: DataType.STRING,
    defaultValue: "employee",
  })
  declare role: string;

  @BelongsToMany(() => Room, () => EmployeeRoom)
  rooms: Room[];
}
