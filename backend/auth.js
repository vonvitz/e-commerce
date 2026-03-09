const jwt = require("jsonwebtoken");
const secret = "ECommerceAPI";

//create a token
module.exports.createAccessToken = (user) => {
  const data = {
    id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
  };

  return jwt.sign(data, secret, {});
};
//verify if log in
module.exports.verify = (req, res, next) => {
  console.log(req.headers.authorization);
  let token = req.headers.authorization;
  if (typeof token === "undefined") {
    return res.status(200).send({ auth: "Failed. No Token" });
  } else {
    console.log(token);
    token = token.slice(7, token.length);

    jwt.verify(token, secret, function (err, decodedToken) {
      if (err) {
        return res.send({
          auth: "Failed",
          message: err.message,
        });
      } else {
        console.log("Resullt from verify method:");
        console.log(decodedToken);

        req.user = decodedToken;

        next();
      }
    });
  }
};
//verify if admin
module.exports.verifyAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    return res.status(403).send({
      auth: "Failed",
      message: "Action Forbidden",
    });
  }
};
