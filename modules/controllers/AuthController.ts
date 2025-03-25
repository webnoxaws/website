import { NextResponse } from "next/server";
import { IUser } from "../models/User";
import { ResponseGenerator } from "@/utils/responseGenerator";
import { UserService } from "../services/UserService";
import { AuthService } from "../services/AuthService";

export class AuthController {
  private authService: AuthService;
  private Secret;

  constructor() {
    this.authService = new AuthService();
    this.Secret = process.env.NEXTAUTH_SECRET;
  }

  async LoginWithPassword(credential: Pick<IUser, "email" | "password">) {
    return await this.authService.LoginWithPassword({ ...credential });
  }

  async ResetPassword(request: Request) {
    try {
      const body = await request.json();
      const result = await this.authService.ResetPassword({
        newPassword: body.newPassword,
        oldPassword: body.oldPassword,
        id: body.id,
      });
      if (!result) throw new Error("Somthing Went Wrong");

      return NextResponse.json(ResponseGenerator.generate(
        200,
        null,
        "Password has been changed Successfully"
      ))
    } catch (error: unknown) {
      return this.handleError(error);
    }

    
  }

  private handleError(error: unknown): NextResponse {
    console.error(error)
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      ...ResponseGenerator.generate(500, null, errorMessage)
    );
  }
}
