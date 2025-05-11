import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IPatientCreationAttr {
  first_name: string;
  last_name: string;
  gender: string;
  birth_day: Date;
  address: string;
  email: string;
  password: string;
  refresh_token: string;
  activation_link: string;
  is_active: boolean;
  passport_series: string;
  passport_number: string;
}

@Table({ tableName: "patients", updatedAt: false })
export class Patient extends Model<Patient, IPatientCreationAttr> {
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
    type: DataType.ENUM("male", "female"),
    allowNull: false,
  })
  declare gender: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  declare birth_day: Date;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare address: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
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
    type: DataType.TEXT,
    defaultValue: DataType.UUIDV4,
  })
  declare activation_link: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_active: boolean;

  @Column({
    type: DataType.STRING(2),
    allowNull: false,
  })
  declare passport_series: string;

  @Column({
    type: DataType.STRING(7),
    allowNull: false,
  })
  declare passport_number: string;
}
