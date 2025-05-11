import { Module, forwardRef } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { PatientsModule } from "../patients/patients.module";

@Module({
  imports: [
    forwardRef(() => PatientsModule), // Bu yerda forwardRef ishlatilganiga e'tibor bering
    JwtModule.register({ global: true }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
