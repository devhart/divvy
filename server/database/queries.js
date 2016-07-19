// Queries necessary for selected routes
//    Note: values must be provided to the strSQL statements
//          by using the variables provided
// See bottom of page for query vs. insert helper functions
//    They take strSQL as an argument

// GET /  POST info to expeses, expense-pools, and expenses-uses
var strSQL = '';

// post => add a new pool
// /api/expense-pools/
var epool_id, name, description, paid, entered_by_id, closed;

strSQL = "INSERT INTO expense_pools (name, description, paid, entered_by_id, closed) VALUES " +
         "'" + name + "', '" + description + "', " +  paid + ", " + entered_by_id + ", " + closed + ";";

// get => get a specific pool
// /api/expense-pools/:id
strSQL = "SELECT * FROM expense_pools WHERE epool_id = " + epool_id + ";";

// post => update a specific pool
// /api/expense-pools/:id
strSQL = "UPDATE expense_pools (epool_id, name, description, paid, entered_by_id, closed) SET " +
         "'" + name + "', '" + description + "', " +  paid + ", " + entered_by_id + ", " + closed + 
         "WHERE epool_id = " + epool_id + ";";

// get --> returns all expenses for selected
// expense pool => retreive all expenses for a specific pool
// /api/expense-pools/id/expenses
strSQL = "SELECT * FROM expenses WHERE epool_id = " + epool_id + ";";

// POST => add an expense to a specific pool
// /api/expense-pools/id/expenses 
var amount, paid_by_id;
strSQL = "INSERT INTO expenses (name, description, amount, paid_by_id, entered_by_id, epool_id) " +
         "VALUES ('" + name + "', '" + description + "', " + amount + ", " + paid_by_id + ", " + entered_by_id + ", " + epool_id + ");";

// TODO: Find friends
//       Facebook API? 

// Check to to see existence of user (returns empty result if no match)
var email;
strSQL = "SELECT * FROM users WHERE email = '" + email + "';";

// get all user info OR
strSQL = "SELECT * FROM users;";
// get profile for specific user
// /api/users/:id
strSQL = "SELECT * FROM users WHERE user_id = " + user_id + ";";

/api/users/:id/friends

/api/users/:id/expenses
/api/users/:id/expenses-users
/api/users/:id/users-expense-pools



  // queryDb: function(strSQL, callback) {
  //   db.query(strSQL, function(err, rows, fields) {
  //     if (err) {
  //       console.log(err);
  //       callback(err);
  //     } else {
  //       var str = JSON.stringify(rows);
  //       rows = JSON.parse(str);
  //       callback(err, rows); 
  //     }
  //   });
  // },

  // insertDb: function(strSQL, callback) {
  //   db.query(strSQL, function(err, rows, fields) {
  //     if (err) {
  //       console.log(err);
  //       callback(err);
  //     } else {
  //       callback(err, 'success');
  //     }
      
  //   });
  // }  