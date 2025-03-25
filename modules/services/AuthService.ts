import _ from "lodash";
import { IUser } from "../models/User";
import db from "../../lib/db";
import bcrypt from "bcrypt";
import { Password } from "@/utils/password";

const passowrdFun = new Password();

export class AuthService {
  Secret;

  constructor() {
    this.Secret = process.env.NEXTAUTH_SECRET;
  }

  async LoginWithPassword(userData: Pick<IUser, "email" | "password">) {
    let user;
    try {
      user = await db.user.findFirst({
        where: { email: userData.email, password: userData.password },
      });

      if (_.isEmpty(user))
        user = await db.regstrationRequest.findFirst({
          where: {
            email: userData.email,
            password: userData.password,
          },
        });
      return user || null;
    } catch (error) {
      console.log(error);
    }
    return user;
  }

  async ResetPassword({
    oldPassword,
    newPassword,
    id,
  }: {
    oldPassword: string;
    newPassword: string;
    id: string;
  }) {
    const userData = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (_.isEmpty(userData)) throw new Error("Invalid Request");

    const isValidPassword = await passowrdFun.validatePassword({
      password: oldPassword,
      hashedPassword: userData.hasedPassword,
    });

    if (!isValidPassword) throw new Error("Invalid Credentials");

    const hasedPassword = await passowrdFun.genarateHashPassword(newPassword);

    const updateData = await db.user.update({
      where: { id },
      data: {
        password: newPassword,
        hasedPassword: hasedPassword,
      },
    });
    return updateData;
  }
}
