const { getProductCollection } = require("../models/productModel");
const { ObjectId } = require("mongodb");

exports.createProduct = async (req, res) => {
  const { name, productCode, description, isPublished, category } = req.body;

  // Validate required fields
  if (!name || !productCode) {
    return res
      .status(400)
      .json({ message: "Name and Product Code are required" });
  }

  try {
    const products = getProductCollection();

    // Check if productCode is already in use
    const existingProduct = await products.findOne({ productCode });
    if (existingProduct) {
      return res.status(400).json({ message: "Product Code already exists" });
    }

    const result = await products.insertOne({
      name,
      productCode,
      description,
      isPublished: isPublished || false,
      category,
      createdAt: new Date(),
    });

    const product = await products.findOne({ _id: result.insertedId });
    res.status(201).json(product);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ message: "Error creating product" });
  }
};

exports.getProducts = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    order = "desc",
  } = req.query;

  try {
    const products = getProductCollection();
    const sortOrder = order === "asc" ? 1 : -1;

    const totalCount = await products.countDocuments({});
    const data = await products
      .find({})
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .toArray();

    res.json({ data, totalCount });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Error fetching products" });
  }
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const products = getProductCollection();
    const product = await products.findOne({ _id: new ObjectId(id) });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error("Error fetching product by ID:", err);
    res.status(500).json({ message: "Error fetching product" });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const products = getProductCollection();
    const updated = await products.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: req.body },
      { returnDocument: "after" }
    );

    if (!updated.value) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updated.value);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ message: "Error updating product" });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const products = getProductCollection();
    const result = await products.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ message: "Error deleting product" });
  }
};
