import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', UserSchema);

const ProductSchema = new Schema({
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  shipDate: { type: Date, required: true },
  status: { type: String }
});
const Product = mongoose.model('Product', ProductSchema);

export { User, Product };
