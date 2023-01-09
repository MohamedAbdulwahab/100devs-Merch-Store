module.exports = {
  getIndex: (req, res) => {
    try {
      const title = '100Devs Store';
      res.render("index.ejs", { title: title });
    } catch(error) {
      console.log(error);
    }
  },
};
