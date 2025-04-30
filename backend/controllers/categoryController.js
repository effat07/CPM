const { ObjectId } = require("mongodb");
const { getCategoryCollection } = require("../models/categoryModel");

exports.createCategory = async (req, res) => {
  const { name, parentId } = req.body;

  if (!name) return res.status(400).json({ message: "Name is required" });

  const categories = getCategoryCollection();
  const result = await categories.insertOne({
    name,
    parentId: parentId ? new ObjectId(parentId) : null,
  });

  res.status(201).json({ _id: result.insertedId, name });
};

exports.getCategories = async (req, res) => {
  const categories = getCategoryCollection();
  const all = await categories.find({}).toArray();
  res.json(all);
};
