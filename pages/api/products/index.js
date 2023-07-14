import Product from "../../../models/Product";
import dbConnect from "../../../util/mongo";

export default async function handler(req, res) {
  dbConnect();
  const { method, cookies } = req;

  const token = cookies.token
  if (method === "GET") {

    try {
      const product = await Product.find();
      res.status(200).json(product);
    } catch (err) {
      console.log(err)
      res.status(500).json({ err: err.message });
    }
  }

  if (method === "POST") {
    // if(!token || token !== process.env.token){
    //   return res.status(401).json("Not authenticated!")
    // }
    try {
      const product =await Product.create(req.body);
     
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  }
}
