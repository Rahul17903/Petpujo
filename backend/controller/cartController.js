const Cart = require("../models/Cart");


//POST: add to cart
const addCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const userId = req.user.id;

    let cart = await Cart.findOne({ userId });

    if (cart) {
      const itemIndex = cart.products.findIndex(
        (p) => p.productId == productId
      );

      if (itemIndex > -1) {
        cart.products[itemIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }

      await cart.save();
        res.status(200).json(cart);
    } else {
      const newCart = new Cart({
        userId,
        products: [{ productId, quantity }],
      });

      await newCart.save();
      res.status(200).json(newCart);
    }
  } catch (error) {
    console.error("Error saving cart:", error);
    res.status(500).json({
      message: "Failed to add to cart",
      error: error.message,
    });
  }
};


// Get user cart
const getCart =  async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate("products.productId");
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Remove product from cart
const removeCart =  async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (cart) {
      cart.products = cart.products.filter(p => p.productId != productId);
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {addCart, getCart, removeCart}