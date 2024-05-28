import { createMollieClient } from "@mollie/api-client";

const mollieClient = createMollieClient({
  apiKey: process.env.MOLLIE_SECRET_KEY,
});

export const createPayment = async (req, res) => {
  try {
    const payment = await mollieClient.payments.create({
      amount: {
        currency: "EUR",
        value: "10.00", // You must send the correct number of decimals, thus we enforce the use of strings
      },
      description: "My first payment",
      redirectUrl: "http://localhost:7070/successPayment",
      //webhookUrl: "https://webshop.example.org/payments/webhook/",
      metadata: {
        order_id: "12345",
      },
    });

    console.log(payment);
  } catch (error) {
    console.warn(error);
  }
};

export const successPayment = async (req, res) => {
  console.log("🚀 ~ successPayment ~ req:", req.body);
  try {
    // const payment = await mollieClient.payments.get(req.body.id);
    res.send("Payment Successfully");

    console.log(payment);
  } catch (error) {
    console.warn(error);
  }
};

// import OpenAI from "openai";

// const openai = new OpenAI();

// async function main() {
//   const image = await openai.images.generate({
//     model: "dall-e-3",
//     prompt: "A cute baby sea otter",
//   });

//   console.log(image.data);
// }
// main();
