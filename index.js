import express from "express";
import { Product, connectDB } from "./db.js";
const app = express();
const PORT = 5000;

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  return res
    .status(200)
    .send("<b>Welcome to MY Resful API using sequelize</b>");
});

//get all product
app.get("/api/products", (req, res) => {
  return res.status(200).json(products);
});

//get product by id
app.get("/api/products/:id", (req, res) => {
  const productId = Number(req.params.id);
  const product = products.find((p) => p.id === productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  return res.status(200).json(product);
});

//create new product
app.post("/api/products", (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({ massage: "Name and price are required!" });
  }
  const newProduct = {
    id: products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
    name: name,
    price: Number(price),
  };
  products.push(newProduct);
  return res.status(201).json(newProduct);
});

//update product by id
app.put("/api/products/:id", (req, res) => {
  const { name, price } = req.body;
  const productId = Number(req.params.id);
  const productsIndex = products.findIndex((p) => p.id === productId);
  if (productsIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }
  products[productsIndex] = {
    id: productId,
    name: name || products[productsIndex].name,
    price: Number(price) || products[productsIndex].price,
  };
  return res.status(200).json(products[productsIndex]);
});

//delete product by id
app.delete("/api/products/:id", (req, res) => {
  const productId = Number(req.params.id);
  const productsIndex = products.findIndex((p) => p.id === productId);
  if (productsIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }
  const deleteProduct = products.splice(productsIndex, 1);
  return res.status(200).json({
    message: "Product delete successfully",
    deleteProduct: deleteProduct[0],
  });
});

app.listen(PORT, () => {
  console.log(`Swever is running on: http://localhost:${PORT}`);
});
