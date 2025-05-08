import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Prescription } from "../../prescription/models/prescription.model";
import { Medicine } from "../../medicines/models/medicine.model";

interface IPrescriptionMedicineCreationAttr {
    medicineId: number;
    prescriptionId: number;
}

@Table({tableName: "prescription_medicine", timestamps: false})
export class PrescriptionMedicine extends Model<PrescriptionMedicine, IPrescriptionMedicineCreationAttr> {

    @ForeignKey(() => Prescription)
    @Column({
        type: DataType.INTEGER
    })
    declare prescriptionId: number;

    @ForeignKey(() => Medicine)
    @Column({
        type: DataType.INTEGER
    })
    declare medicineId: number;

    @BelongsTo(() => Prescription)
    prescription: Prescription;

    @BelongsTo(() => Medicine)
    medicine: Medicine;
}
