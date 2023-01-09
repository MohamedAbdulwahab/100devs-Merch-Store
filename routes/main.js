const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const storeController = require("../controllers/store");
const { ensureAuth } = require("../middleware/auth");
const productController= require("../controllers/product")

// Main Routes
router.get("/", homeController.getIndex);
router.get("/storeMain", ensureAuth, storeController.getStoreMain);

// Routes for user login/signup
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);


// Routes for products 
routes.get("/products", productController.index);

// Routes for store actions like shop/cart
router.get("/shop", storeController.getShop);
router.get("/cart", storeController.getCart);

module.exports = router;
