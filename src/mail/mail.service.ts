import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { Patient } from "../patients/models/patient.model";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(user: Patient) {
    const url = `${process.env.API_HOST}/api/patients/activate/${user.activation_link}`;
    console.log(url);

    await this.mailerService.sendMail({
      to: user.email,
      subject: "Welcome to private hospital",
      template: "confirmation",
      context: {
        name: user.first_name,
        url,
      },
    });
  }
}
