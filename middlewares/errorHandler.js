const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (err.name === 'WrongPassword') {
    res.status(400).json({ message: 'Wrong Email or Password' });
  } else if (err.name === 'ErrorNotFound') {
    res.status(404).json({ message: `Error not found` });
  } else if (err.name === 'ValidationFailed') {
    res.status(404).json({ message: `Validation Failed` });
  }else {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = errorHandler;
