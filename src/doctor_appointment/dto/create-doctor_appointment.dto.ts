export class CreateDoctorAppointmentDto {
  patientId: number;
  doctorId: number;
  roomId: number;
  cause_of_illness: string;
  complaint: string;
  patient_queue: number;
}
