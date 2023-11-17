import express from "express";
import cors from "cors";
import productRoutes from './routes/productRoutes.js'

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', productRoutes);

app.listen(5000, () => {
  console.log("Server running on localhost:5000");
});