const controller = {};

controller.addPool = (req, res) => {
  // create statement
  // grab data from request body
  // sendStatus response
  res.send('addPool');
};

controller.getPool = (req, res) => {
  // find information
  // req.params.id
  // if error, sendStatus
  // otherwise send data
  res.send('getPool');
};

controller.updatePool = (req, res) => {
  res.send('updatePool');
};

export default controller;
