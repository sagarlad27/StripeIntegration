import Order from "../model/order.js";
import Stripe from "stripe";

const STRIPE_KEY =
  process.env.STRIPE_KEY ||
  "sk_test_51QXdi6CNe28bMH33nqanrUKWpnYpWCnZykuYmwvKNCVO0sRTunNrwhG7RZXaRGbA6xwt21i2gnWCFku7i9dEeW1F00Ai06jYeq";
const stripe = Stripe(STRIPE_KEY);


// create an order

export const createOrder = async (req, res) => {
  const { purchasedItems, paymentStatus, email, price } = req.body;

  // Validate request body
  if (!purchasedItems || !paymentStatus || !email || !price) {
    return res.status(400).json("Missing Required Fields");
  }

  try {
    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(price * 100), // Convert to cents
      currency: "usd",
      payment_method_types: ["card"],
    });

    // Save the order in the database
    const newOrder = new Order({
      purchasedItems,
      paymentStatus,
      transactionId: paymentIntent.id,
      price,
      email,
    });

    // Save and handle errors
    await newOrder.save();

    // Return the clientSecret to the frontend
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("Error creating order:", err);

    // Handle duplicate key error (email or transactionId)
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ message: "Duplicate entry detected", error: err.keyValue });
    }

    res.status(500).json({ message: "Error creating order", error: err.message });
  }
};


// fetch the order by email
export const orderByEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const order = await Order.findOne({ email });
    if (!order) {
      res.status(404).json("No Order With the given email");
    }
    res.status(200).json(order);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error Fetching details", error: err.message });
  }
};
// update the payment status of the order
export const updateOrder = async (req, res) => {
  try {

    const {email}=req.body;

    await Order.findOneAndUpdate(
      { email: email },
      {
        $set: { paymentStatus: "success" },
      }
    );
    res.status(200).json("Payment Successfull");
    return;
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating Status", error: err.message });
  }
};
// delete an order
export const deleteOrder = async (req, res) => {
  const { email } = req.params;
  try {
    if (!email) {
      res.status(404).json("Email not found");
    }
    await Order.findOneAndDelete({ email });
    res.status(200).json("Deleted Successfully");
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting order", error: err.message });
  }
};
