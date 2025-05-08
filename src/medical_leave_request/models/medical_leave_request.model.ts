import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { DoctorAppointment } from "../../doctor_appointment/models/doctor_appointment.models";

interface IMedicalLeaveRequestCreationAttr{
    doctorAppointmentId: number
    reason: string;
    start_date: Date;
    end_date: Date;
}

@Table({tableName: 'medical_leave_request', updatedAt: false})
export class MedicalLeaveRequest extends Model<MedicalLeaveRequest, IMedicalLeaveRequestCreationAttr> {

    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    declare id: number;


    @ForeignKey(() => DoctorAppointment)
    @Column({
        type: DataType.INTEGER,
    })
    declare doctorAppointmentId: number;

    @Column({
        type: DataType.TEXT
    })
    declare reason: string;

    @Column({
        type: DataType.DATE
    })
    declare start_date: Date;

    @Column({
        type: DataType.DATE
    })
    declare end_date: Date;

    @BelongsTo(()=> DoctorAppointment)
    doctor_appointment: DoctorAppointment;
}
