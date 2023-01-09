module.exports = {
	getStoreMain: async (req, res) => {
		const title = 'Main Store';
		try {
			res.render("storeMain.ejs", { user: req.user, title: title });
		} catch (err) {
			console.log(err);
		}
	},

	getShop: (req, res) => {
		res.render("shop.ejs");
	},

	getCart: (req, res) => {
		res.render("cart.ejs");
	}
};
