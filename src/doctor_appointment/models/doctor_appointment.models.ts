import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Patient } from "../../patients/models/patient.model";
import { Doctor } from "../../doctors/models/doctor.model";
import { Room } from "../../rooms/models/room.model";
import { MedicalLeaveRequest } from "../../medical_leave_request/models/medical_leave_request.model";
import { Payment } from "../../payments/models/payment.model";
import { Diagnosis } from "../../diagnoses/models/diagnosis.model";
import { Prescription } from "../../prescription/models/prescription.model";

interface IDoctorAppointmentCreationAttr {
    patientId: number;
    doctorId: number;
    roomId: number;
    complaint: string;
    patient_queue: number;
}

@Table({tableName: 'doctor_appointment', updatedAt: false})
export class DoctorAppointment extends Model<DoctorAppointment, IDoctorAppointmentCreationAttr> {

    @ForeignKey(()=> Patient)
    @Column({
        type: DataType.INTEGER,
    })
    declare patientId: number

    @ForeignKey(()=> Doctor)
    @Column({
        type: DataType.INTEGER,
    })
    declare doctorId: number

    @ForeignKey(()=> Room)
    @Column({
        type: DataType.INTEGER,
    })
    declare roomId: number;

    @Column({
        type: DataType.TEXT,
    })
    declare complaint: string;

    @Column({
        type: DataType.INTEGER,
    })
    declare patient_queue: number


    
    @BelongsTo(() => Patient)
    patient: Patient;

    @BelongsTo(() => Doctor)
    doctor: Doctor;

    @BelongsTo(() => Room)
    room: Room;

    @HasMany(()=> MedicalLeaveRequest)
    medical_leave_request: MedicalLeaveRequest[];

    @HasMany(()=> Payment)
    payment: Payment[];

    @HasMany(()=> Diagnosis)
    diagnosis: Diagnosis[];

    @HasMany(()=> Prescription)
    prescription: Prescription[]
}
