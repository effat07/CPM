const protect = (req, res, next) => {
    console.log('Middleware working');
    next();
  };
  
  module.exports = { protect };
  