export class CreateMedicalLeaveRequestDto {
  doctorAppointmentId: number;
  reason: string;
  start_date: Date;
  end_date: Date;
}
