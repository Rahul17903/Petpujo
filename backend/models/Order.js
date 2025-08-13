const { Schema, model } = require("mongoose");

const OrderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, default: 1 },
        price: { type: Number, required: true }
      }
    ],
    totalAmount: { type: Number, required: true },
    shippingAddress: {
      address: String,
      city: String,
      state: String,
      postalCode: String,
      country: String
    },
    paymentInfo: {
      orderId: { type: String }, // Razorpay order id
      paymentId: { type: String }, // Razorpay payment id
      signature: { type: String }, // Razorpay signature
      status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" }
    },
    orderStatus: { type: String, enum: ["processing", "shipped", "delivered"], default: "processing" }
  },
  { timestamps: true }
);

module.exports = model("Order", OrderSchema);
