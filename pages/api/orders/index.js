
import Order from "../../../models/Order";
import dbConnect from "../../../util/mongo";

export default async function handler(req, res) {
  dbConnect();
  const { method } = req;
  if (method === "GET") {    try {
      const order= await Order.find();
      res.status(200).json(order);
    } catch (err) {
      console.log(err)
      res.status(500).json({ err: err.message });
    }
  }

  if (method === "POST") {
    console.log(req.body)
    try {
      const order =await Order.create(req.body);
     
      res.status(201).json(order);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  }
}
