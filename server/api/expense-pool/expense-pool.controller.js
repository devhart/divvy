const controller = {};

// addPool
controller.addPool = (req, res) => {
  // create statement
  // grab data from request body
  // sendStatus response
  res.sendStatus('addPool');
};

// getPool
controller.getPool = (req, res) => {
  // find information
  // req.params.id
  // if error, sendStatus
  // otherwise send data
  res.send('getPool');
};

// updatePool
controller.updatePool = (req, res) => {
  res.send('updatePool');
};

// module.exports = {
//   getAllDrinks: function(req, res) {
//     //
//     strSQL = 'SELECT * from drinks'
//     helper.queryDb(strSQL, function(err, data){
//       if (err) {
//         console.log(err);
//         res.sendStatus(500);
//       } else {
//         res.send(data);
//       }
//     });
//   },

export default controller;
