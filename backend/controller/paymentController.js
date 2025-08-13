const crypto = require("crypto");
const razorpay = require("../utils/razorpay");
const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    const { amount, products, userId } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ error: "Products are required" });
    }

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "order_rcptid_" + Math.random(),
    };
    const order = await razorpay.orders.create(options);

    const newOrder = await Order.create({
      user: userId || req.user.id,
      products: products.map((p) => ({
        productId: p.productId,
        quantity: p.quantity,
        price: p.price, // ✅ Price now included
      })),
      totalAmount: amount,
      paymentInfo: {
        orderId: order.id,
        paymentId: null,
        signature: null,
        status: "pending",
      },
    });

    res.json({ razorpayOrder: order, dbOrder: newOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (expectedSign === razorpay_signature) {
      await Order.findOneAndUpdate(
        { "paymentInfo.orderId": razorpay_order_id },
        {
          $set: {
            "paymentInfo.paymentId": razorpay_payment_id,
            "paymentInfo.signature": razorpay_signature,
            "paymentInfo.status": "paid",
          },
        }
      );
      res.json({ success: true, message: "Payment verified & order updated" });
    } else {
      res.status(400).json({ success: false, message: "Payment verification failed" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { verifyPayment, createOrder };
