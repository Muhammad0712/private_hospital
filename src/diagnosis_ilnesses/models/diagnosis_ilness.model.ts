import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { Diagnosis } from "../../diagnoses/models/diagnosis.model"
import { Illness } from "../../illness/models/illness.model";

interface IDiagnosisIllnessesCreationAttr{
    diagnosis_id: number;
    illness_id: number;
}

@Table({tableName: 'diagnosis_ilnesses', timestamps: false})
export class DiagnosisIlness extends Model<DiagnosisIlness, IDiagnosisIllnessesCreationAttr> {

    @ForeignKey(() => Diagnosis)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true
    })
    declare diagnosis_id: number;

    @ForeignKey(() => Illness)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true
    })
    declare illness_id: number;

    @BelongsTo(() => Diagnosis)
    diagnosis: Diagnosis;

    @BelongsTo(() => Illness)
    illness: Illness;
}
