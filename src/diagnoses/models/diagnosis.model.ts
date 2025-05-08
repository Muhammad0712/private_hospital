import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { DoctorAppointment } from "../../doctor_appointment/models/doctor_appointment.models";
import { Illness } from "../../illness/models/illness.model";
import { DiagnosisIlness } from "../../diagnosis_ilnesses/models/diagnosis_ilness.model";

interface IDiagnosisCreationAttr {
  additional: string;
  doctor_appointment_id: number;
}

@Table({ tableName: "diagnosis", timestamps: false })
export class Diagnosis extends Model<Diagnosis, IDiagnosisCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.TEXT,
    defaultValue: "",
  })
  declare additional: string;

  @ForeignKey(() => DoctorAppointment)
  @Column({
    type: DataType.INTEGER,
  })
  declare doctor_appointment_id: number;

  @BelongsTo(() => DoctorAppointment)
  doctor_appointment: DoctorAppointment;

  @BelongsToMany(() => Illness, () => DiagnosisIlness)
  illnesses: Illness[];
}
