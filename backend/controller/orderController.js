const Order = require('../models/Order')


// Create Order after payment
const createOrder = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized: user not found" });
    }

    const { products, totalAmount, shippingAddress, paymentInfo } = req.body;

    // Validate required fields
    if (!products || products.length === 0 || !totalAmount) {
      return res.status(400).json({ error: "Missing required order details" });
    }

    const newOrder = new Order({
      userId: req.user.id,
      products,
      totalAmount,
      shippingAddress,
      paymentInfo: {
        ...paymentInfo,
        status: "paid" // set paid if payment success
      }
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);

  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ error: err.message });
  }
};


//get all order 
const allOrder = async(req,res)=>{
    try {
        const order = await Order.find({userId: req.user.id}).populate("products.productId")
        res.json(order)
    } catch (error) {
        res.status(500).json({msg:"Cann't fetch the order data"})
    }
}

module.exports = {createOrder, allOrder}