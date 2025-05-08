import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Prescription } from "../../prescription/models/prescription.model";
import { PrescriptionMedicine } from "../../prescription_medicines/models/prescription_medicine.model";

interface IMedicineCreationAttr {
    name: string;
    for_children: number;
    for_adults: number;
    amount_for_children: number;
    amount_for_adults: number;
    medicine_info: string;
}

@Table({ tableName: "medicines" })
export class Medicine extends Model<Medicine, IMedicineCreationAttr> {
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
    declare name: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare for_children: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare for_adults: number;

    @Column({
        type: DataType.DECIMAL(3, 2),
        allowNull: false,
    })
    declare amount_for_children: number;

    @Column({
        type: DataType.DECIMAL(3, 2),
        allowNull: false,
    })
    declare amount_for_adults: number;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    declare medicine_info: string;

    @BelongsToMany(() => Prescription, () => PrescriptionMedicine)
    prescriptions: Prescription[]
}
