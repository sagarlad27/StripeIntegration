import express from "express";
import {
  createOrder,
  deleteOrder,
  orderByEmail,
  updateOrder,
} from "../controller/orderController.js";

const router = express.Router();

// order routes

router.get("/orderByEmail", orderByEmail);
router.post("/create", createOrder);
router.patch("/updateOrder", updateOrder);
router.delete("/:email", deleteOrder);

export default router;
