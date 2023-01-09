const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  image: { type: String, unique: true },
  description: {type: String, unique: true},
  price: {type:  Number},
});

// View -> Route -> Controller -> Model (Product) -> Database (Mongodb, SQL)

// Create a Product schema 
products = [
    {
        title: 'shoes',
        image: 'url',
        description: '100dev sneakers',
        price: $40,
    },
    {
        title: '#100devs shirt',
        image: 'url',
        description: 't-shirt with 100devs on it',
        price: $20,
    },
    {
        title: '100devs hoodie',
        image: 'url',
        description: 'hoodie with 100devs on the back',
        price: $50,
    },
    {
        title: 'black 100devs shirt',
        image: 'url',
        description: 'shirt with 100devs in white writing',
        price: $40,
    },
    {
        title: '100devs tank top',
        image: 'url',
        description: "tank top with famous phrase 'we go get!'",
        price: $30,
    },
]


// Export Product Schema 

module.exports = mongoose.model("Product", ProductSchema);
