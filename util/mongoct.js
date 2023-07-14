import mongoose from "mongoose";
const MONGO_URL = process.env.MONGO_URL;
async function connectToDatabase() {
    try {
      await mongoose.connect("mongodb+srv://lihazali66:lihaz@1212@wellkhan.jbz7ibm.mongodb.net/Pizza?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
    }
  }
  
  module.exports = connectToDatabase;