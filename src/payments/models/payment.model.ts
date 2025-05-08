import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { DoctorAppointment } from "../../doctor_appointment/models/doctor_appointment.models";

interface IPaymentCreationAttr{
    doctor_appointment_id: number;
    quantity: number;
    payment_type: string;
}

@Table({tableName: 'payments', updatedAt: false})
export class Payment extends Model<Payment, IPaymentCreationAttr> {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    declare id: number;

    @ForeignKey(() => DoctorAppointment)
    @Column({
        type: DataType.INTEGER
    })
    declare doctor_appointment_id: number;

    @Column({
        type: DataType.DECIMAL(10, 2)
    })
    declare quantity: number;

    @Column({
        type: DataType.ENUM('cash', 'card')
    })
    declare payment_type: string;

    @BelongsTo(() => DoctorAppointment)
    doctor_appointment: DoctorAppointment
}
