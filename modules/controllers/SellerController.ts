import { NextResponse } from "next/server";
import { SellerService } from "../services/SellerService";
import { SellerValidation } from "../validations/SellerValidation";
import { ResponseGenerator } from "@/utils/responseGenerator";
import { ZodError } from "zod";

export class SellerController {
  private sellerService: SellerService;

  constructor() {
    this.sellerService = new SellerService();
  }

  async RegisterSeller(request: Request) {
    try {
      const body = await request.json();
      
      const { success, error, data } = SellerValidation.RegisterSeller().safeParse(body);

      if (!success) {
        console.log(error.format());
        return NextResponse.json(
          ...ResponseGenerator.generate(
            400,
            null,
            "Validation failed",
            error.format()
          )
        );
      }

      const result = await this.sellerService.registerSeller(data);
      return NextResponse.json(
        ...ResponseGenerator.generate(
          201,
          result,
          "Seller registered successfully"
        )
      );
    } catch (error: unknown) {
      return this.handleError(error);
    }
  }

  private handleError(error: unknown): NextResponse {
    let errorMessage = "An unknown error occurred";
    let statusCode = 500;

    if (error instanceof Error) {
      errorMessage = error.message;
      if ('status' in error && typeof (error as any).status === 'number') {
        statusCode = (error as any).status;
      }
    }

    return NextResponse.json(
      ...ResponseGenerator.generate(statusCode, null, errorMessage)
    );
  }
}
