import { createMollieClient } from "@mollie/api-client";

const mollieClient = createMollieClient({
  apiKey: process.env.MOLLIE_SECRET_KEY,
});

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
      metadata: {
        order_id: "12345",
      },
    });
  } catch (error) {}
};

export const successPayment = async (req, res) => {
  try {
    res.send("Payment Successfully");
  } catch (error) {}
};
