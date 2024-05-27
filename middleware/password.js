const checkPassword = (req, res, nxt) => {
  if (req.body.password === process.env.PASSWORD) {
    nxt();
  } else {
    res.status(400).json("Invalid process");
  }
};

module.exports= checkPassword