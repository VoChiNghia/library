const jwt = require("jsonwebtoken");
const generateToken = (id, publicKey, privateKey) => {
    
  const token = jwt.sign({id}, privateKey, { algorithm:'RS256',expiresIn: "1d" });

  const refeshToken = jwt.sign({ id }, privateKey, { algorithm:'RS256',expiresIn: "3d" });

  jwt.verify(token, publicKey, (err, decoded) => {
    if (err) throw new Error(err);
    console.log('decoded',decoded);
  });

  return { token, refeshToken };
};

module.exports = generateToken;
