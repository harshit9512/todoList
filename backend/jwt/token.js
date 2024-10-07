import jwt from 'jsonwebtoken'

export const generateToken=(req)=>{
    console.log("In generateToken function");
    const token = jwt.sign({ id: req._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log("token generated", token);
    return token;
};

export const verifyToken = (req, res, next) => {
    console.log("In verifyToken function");
    const token = req.header('Authorization');
    console.log("token received", token);
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
  
    try {
      const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
      req.user = decoded.id;
      console.log("user id extracted from token:", req.user);
      next();
    } catch (err) {
      res.status(400).json({ message: 'Token is not valid' });
    }
  };

  