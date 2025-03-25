import db from "../../lib/db";
import { Seller, ISeller } from "../models/Seller";
import { IBankInfo } from "../models/BankInfo";
import {v4 as uuidv4} from "uuid"

export class SellerService {
  async registerSeller(data: {
    userId: string;
    storeName: string;
    storeDescription?: string;
    upiId?: string;
    accountHolderName: string;
    accountNumber: string;
    bankName: string;
    ifscCode: string;
    branchName?: string;
    accountType?: string;
  }) {
    try {
      const bankUuid=uuidv4()
      const sellerProfile = await db.sellerProfile.create({
        data: {
          userId: data.userId,
          storeName: data.storeName,
          storeDescription: data.storeDescription || undefined,
          upiId: data.upiId || undefined,
          isApproved: false,
          bankAccountId:bankUuid,
          bankAccount: {
            create: {
              id:bankUuid,
              accountHolderName: data.accountHolderName,
              accountNumber: data.accountNumber,
              bankName: data.bankName,
              ifscCode: data.ifscCode,
              branchName: data.branchName || undefined,
              accountType: data.accountType || undefined,
              isVerified: false,
            },
          },
        },
        include: {
          bankAccount: true,
          user: true,
        },
      });


      if (!sellerProfile.bankAccount) {
        throw new Error("Failed to create bank account");
      }

      const sellerData: ISeller & IBankInfo = {
        id: sellerProfile.id,
        userId: sellerProfile.userId,
        storeName: sellerProfile.storeName,
        storeDescription: sellerProfile.storeDescription || undefined,
        bankAccountId: sellerProfile.bankAccountId || undefined,
        upiId: sellerProfile.upiId || undefined,
        isApproved: sellerProfile.isApproved,
        createdAt: sellerProfile.createdAt,
        updatedAt: sellerProfile.updatedAt,
        accountHolderName: sellerProfile.bankAccount.accountHolderName,
        accountNumber: sellerProfile.bankAccount.accountNumber,
        bankName: sellerProfile.bankAccount.bankName,
        ifscCode: sellerProfile.bankAccount.ifscCode,
        branchName: sellerProfile.bankAccount.branchName || undefined,
        accountType: sellerProfile.bankAccount.accountType || undefined,
        isVerified: sellerProfile.bankAccount.isVerified,
        verificationDate: sellerProfile.bankAccount.verificationDate || undefined,
      };

      return new Seller(sellerData);
    } catch (error: any) {
      if (error.code === "P2002") {
        throw {
          message: "A seller profile already exists for this user",
          status: 400,
        };
      }
      throw {
        message: error.message || "Failed to register seller",
        status: 500,
      };
    }
  }
}
