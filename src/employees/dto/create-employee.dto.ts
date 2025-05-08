export class CreateEmployeeDto {
  first_name: string;
  last_name: string;
  birth_day: Date;
  gender: string;
  passport_series: string;
  passport_number: string;
  position: string;
  work_rate: number;
  email: string;
  password: string;
  refresh_token: string;
  is_admin: boolean;
  is_creator: boolean;
}
