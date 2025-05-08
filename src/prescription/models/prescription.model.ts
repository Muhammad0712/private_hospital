import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { DoctorAppointment } from "../../doctor_appointment/models/doctor_appointment.models";
import { Medicine } from "../../medicines/models/medicine.model";
import { PrescriptionMedicine } from "../../prescription_medicines/models/prescription_medicine.model";

interface IPrescriptionCreationAttr{
    additional: string;
    doctor_appointment_id: number;
}

@Table({tableName: 'prescriptions', updatedAt: false})
export class Prescription extends Model<Prescription, IPrescriptionCreationAttr> {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    declare id: number;

    @Column({
        type: DataType.TEXT,
        defaultValue: ""
    })
    declare additional: string;

    @ForeignKey(() => DoctorAppointment)
    @Column({
        type: DataType.INTEGER
    })
    declare doctor_appointment_id: number

    @BelongsTo(() => DoctorAppointment)
    doctor_appointment: DoctorAppointment;

    @BelongsToMany(() => Medicine, () => PrescriptionMedicine)
    medicines: Medicine[];
}
