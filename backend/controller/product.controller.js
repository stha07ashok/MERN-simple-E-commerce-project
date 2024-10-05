import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("error in fetching products", error.message);
    res.status(404).json({ success: false, message: "Product not found" });
  }
};

export const createProducts = async (req, res) => {
  const product = req.body; //user will send this data

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("error is created:", error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
};

export const updateProducts = async (req, res) => {
  const { id } = req.params; //getting product by id to update

  const product = req.body; //getting product of that id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    //if id not found
    return res
      .status(404)
      .json({ success: false, message: "product not found" });
  }

  try {
    const updateProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updateProduct });
  } catch (error) {
    res.status(404).json({ success: false, message: "server error" });
  }
};

export const deleteProducts = async (req, res) => {
  const { id } = req.params; //getting product by id to delete

  if (!mongoose.Types.ObjectId.isValid(id)) {
    //if id not found
    return res
      .status(404)
      .json({ success: false, message: "product not found" });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "server error" });
  }
};
