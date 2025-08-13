const Product = require('../models/Product');

// POST: Add a product 
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, brand, stock, rating } = req.body;

    // Get filename from multer upload
    const imagePath = req.file ? req.file.filename : undefined;

    if (!name || !description || !price || !category || !stock || !imagePath) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const product = new Product({
      name,
      description,
      price,
      image: `/uploads/${imagePath}`, // Save image path (optional: serve statically)
      category,
      brand,
      stock,
      rating,
    });

    await product.save();

    res.status(200).json({ message: "Product added successfully", product });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Failed to add product" });
  }
};

// GET: Fetch all product details
const allProduct = async (req, res) => {
    try {
        const allProducts = await Product.find();
        res.status(200).json({
            success: true,
            count: allProducts.length,
            products: allProducts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch all products" });
    }
};

// GET: Single product details
const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id); // Corrected from findOne(req.params.id)
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch product" });
    }
};

// DELETE: Delete the product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete product" });
    }
};

module.exports = { addProduct, allProduct, getProduct, deleteProduct };
