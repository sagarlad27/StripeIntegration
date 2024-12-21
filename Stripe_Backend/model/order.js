import mongoose from "mongoose";
// Order Schema
const OrderSchema = mongoose.Schema({
  purchasedItems: [
    {
      item: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    default: "pending",
    required: true,
  },
  transactionId: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const Order = mongoose.model("order", OrderSchema);
export default Order;
