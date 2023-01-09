const Product = require('../models/Product')

//Get Product
router.get("/find/:id", async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  });


exports.getLogin = (req, res) => {
    // Fetch products from your Product.js model and save to variable 
    
    // Return prouducts variable in the response  
}

module.exports()