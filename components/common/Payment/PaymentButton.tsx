import { useEffect, ReactNode } from "react";

interface PaymentButtonProps {
  children: (handlePayment: () => Promise<void>) => ReactNode;
  companyName?: string;
  description?: string;
  customerInfo?: {
    name: string;
    email: string;
    contact: string;
  };
  themeColor?: string;
  onSuccess?: () => void;
  onFailure?: () => void;
}

const PaymentButton = ({
  children,
  companyName = "Your Company",
  description = "Test Transaction",
  customerInfo = {
    name: "John Doe",
    email: "johndoe@example.com",
    contact: "9999999999",
  },
  themeColor = "#3399cc",
  onSuccess,
  onFailure,
}: PaymentButtonProps) => {
  const loadRazorpay = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  };

  useEffect(() => {
    loadRazorpay();
  }, []);

  const handlePayment = async () => {
    const response = await fetch("/api/createOrder", { method: "POST" });
    const order = await response.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,
      name: companyName,
      description: description,
      handler: async function (response: any) {
        const verifyResponse = await fetch("/api/verifyPayment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            order_id: order.id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          }),
        });

        const verifyResult = await verifyResponse.json();
        if (verifyResult.success) {
          onSuccess ? onSuccess() : alert("Payment Verified Successfully!");
        } else {
          onFailure ? onFailure() : alert("Payment Verification Failed!");
        }
      },
      prefill: customerInfo,
      theme: { color: themeColor },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return children(handlePayment);
};

export default PaymentButton;
