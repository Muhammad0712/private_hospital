import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { PatientsModule } from "./patients/patients.module";
import { Patient } from "./patients/models/patient.model";
import { IllnessModule } from "./illness/illness.module";
import { Illness } from "./illness/models/illness.model";
import { RoomsModule } from "./rooms/rooms.module";
import { Room } from "./rooms/models/room.model";
import { DoctorsModule } from "./doctors/doctors.module";
import { EmployeesModule } from "./employees/employees.module";
import { Employee } from "./employees/models/employee.models";
import { Doctor } from "./doctors/models/doctor.model";
import { MedicinesModule } from "./medicines/medicines.module";
import { EmployeeRoomsModule } from "./employee_rooms/employee_rooms.module";
import { EmployeeRoom } from "./employee_rooms/models/employee_room.models";
import { ConfigModule } from "@nestjs/config";
import { DoctorRoomsModule } from "./doctor_rooms/doctor_rooms.module";
import { DoctorRoom } from "./doctor_rooms/models/doctor_room.model";
import { DoctorAppointmentModule } from "./doctor_appointment/doctor_appointment.module";
import { DoctorAppointment } from "./doctor_appointment/models/doctor_appointment.models";
import { MedicalLeaveRequestModule } from "./medical_leave_request/medical_leave_request.module";
import { MedicalLeaveRequest } from "./medical_leave_request/models/medical_leave_request.model";
import { PaymentsModule } from './payments/payments.module';
import { Payment } from "./payments/models/payment.model";
import { DiagnosesModule } from './diagnoses/diagnoses.module';
import { Diagnosis } from "./diagnoses/models/diagnosis.model";
import { DiagnosisIlnessesModule } from './diagnosis_ilnesses/diagnosis_ilnesses.module';
import { DiagnosisIlness } from "./diagnosis_ilnesses/models/diagnosis_ilness.model";
import { PrescriptionModule } from './prescription/prescription.module';
import { Prescription } from "./prescription/models/prescription.model";
import { PrescriptionMedicinesModule } from './prescription_medicines/prescription_medicines.module';
import { PrescriptionMedicine } from "./prescription_medicines/models/prescription_medicine.model";
import { Medicine } from "./medicines/models/medicine.model";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [
        Patient,
        Illness,
        Room,
        Doctor,
        Employee,
        EmployeeRoom,
        DoctorRoom,
        DoctorAppointment,
        MedicalLeaveRequest,
        Payment,
        Diagnosis,
        DiagnosisIlness,
        Prescription,
        PrescriptionMedicine,
        Medicine
      ],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    PatientsModule,
    IllnessModule,
    RoomsModule,
    DoctorsModule,
    EmployeesModule,
    MedicinesModule,
    EmployeeRoomsModule,
    DoctorRoomsModule,
    DoctorAppointmentModule,
    MedicalLeaveRequestModule,
    PaymentsModule,
    DiagnosesModule,
    DiagnosisIlnessesModule,
    PrescriptionModule,
    PrescriptionMedicinesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
