import { z } from "zod";

export class SellerValidation {
  static RegisterSeller() {
    return z.object({
      userId: z.string().min(1, "User ID is required"),
      storeName: z.string().min(1, "Store name is required"),
      storeDescription: z.string().optional(),
      upiId: z.string().optional(),
      accountHolderName: z.string().min(1, "Account holder name is required"),
      accountNumber: z
        .string(),
      bankName: z.string().min(1, "Bank name is required"),
      ifscCode: z
        .string(),
      branchName: z.string().optional(),
      accountType: z.string(),
      gstn: z
        .string()
       
        .optional(),
      agreeTerms: z
        .boolean()
        .refine((val) => val === true, "You must agree to the terms and conditions")
    });
  }
} 