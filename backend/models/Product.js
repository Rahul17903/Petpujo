const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
  {
    name: { type: String, required: true, },
    description: { type: String, required: true, },
    price: { type: Number, required: true },
    image: { type: String, default: "https://i.pinimg.com/474x/67/ef/ba/67efba662ad08ef80e28a28a25d92787.jpg" },
    category : {type : String, required:true, },
    brand : {type:String, },
    stock : {type:Number, required:true},
    rating : {type:Number,  default:4.4},
  },
  { timestamps: true }
);

module.exports = model("Product", ProductSchema);
