import { createMollieClient } from "@mollie/api-client";

const mollieClient = createMollieClient({
  apiKey: process.env.MOLLIE_SECRET_KEY,
});

//console.log(mollieClient);
export const createPayment = async (req, res) => {
  try {
    const payment = await mollieClient.payments.create({
      amount: {
        currency: "EUR",
        value: "10.00",
      },
      description: "My first payment",
      redirectUrl: "http://localhost:7070/successPayment",
      //webhookUrl: "https://webshop.example.org/payments/webhook/",
      method: "paypal",
      metadata: {
        order_id: "12345",
      },
    });
    console.log("🚀 ~ createPayment ~ payment:", payment);

    return res.status(200).json({ success: true, title: "Success", payment });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const successPayment = async (req, res) => {
  try {
    res.send("Payment Successfully");
  } catch (error) {}
};
