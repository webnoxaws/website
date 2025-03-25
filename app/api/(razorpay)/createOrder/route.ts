import type { NextApiRequest, NextApiResponse } from "next";
import { razorpay } from "@/lib/razorpay";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const options = {
      amount: 50000, // amount in the smallest currency unit (e.g., 50000 paise = ₹500)
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json(order);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
