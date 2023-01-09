module.exports = {
  getShop: (req, res) => {
    res.render("shop.ejs");
  },

  getCart: (req, res) => {
    res.render("cart.ejs");
  }
};
