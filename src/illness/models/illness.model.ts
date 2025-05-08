import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { Diagnosis } from "../../diagnoses/models/diagnosis.model";
import { DiagnosisIlness } from "../../diagnosis_ilnesses/models/diagnosis_ilness.model";

interface IIllnessCreationAttr {
  illness_name: string;
  additional: string;
}

@Table({ tableName: "illness", timestamps: false })
export class Illness extends Model<Illness, IIllnessCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    defaultValue: "",
  })
  declare illness_name: string;

  @Column({
    type: DataType.TEXT,
    defaultValue: "",
  })
  declare additional: string;

  @BelongsToMany(() => Diagnosis, () => DiagnosisIlness)
  diagnoses: Diagnosis[];
}
