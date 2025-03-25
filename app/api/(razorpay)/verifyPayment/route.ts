import type { NextApiRequest, NextApiResponse } from "next";
import HmacSHA256 from "crypto-js/hmac-sha256";
import Hex from "crypto-js/enc-hex";


export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { order_id, payment_id, signature } = req.body;

    const generatedSignature = HmacSHA256(
      order_id + "|" + payment_id,
      process.env.RAZORPAY_KEY_SECRET!
    ).toString(Hex);

    if (generatedSignature === signature) {
      console.log("Payment Verified. Updating order status...");

      res.status(200).json({ success: true, message: "Payment verified" });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error: any) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
