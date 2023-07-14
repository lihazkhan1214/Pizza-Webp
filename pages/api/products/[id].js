import Product from "../../../models/Product";
import dbConnect from "../../../util/mongo";

export default async function handler(req, res) {
  dbConnect();
  const {
    method,
    query: { id },
    cookies
  } = req;
  const token = cookies.token;

  if (method === "GET") {
    try {
      const product = await Product.findById(id);
      res.status(200).json(product);
    } catch (err) {
      console.log(err)
      res.status(500).json({ err: err.message });
    }
  }
  if (method === "PUT") {
    // if(!token || token !== process.env.token){
    //   return res.status(401).json("Not authenticated!")
    // }
    try {
      const product = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "DELETE") {
    // if(!token || token !== process.env.token){
    //   return res.status(401).json("Not authenticated!")
    // }
    console.log(process.env.token)
    try {
      await Product.findByIdAndDelete(id);
     
      res.status(201).json("the product has been deleted");
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  }
}
