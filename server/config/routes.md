Routes
// GET /  POST info to expeses, expense-pools, and expenses-uses

// post:
/api/expense-pools/ //=> add a new pool

// get
/api/expense-pools/:id //=> get a specific pool

// post
/api/expense-pools/:id //=> update a specific pool

// get --> returns all expenses for selected
// expense pool
/api/expense-pools/id/expenses //=> retreive all expenses for a specific pool
// POST
/api/expense-pools/id/expenses //=> add an expense to a specific pool


// find friends

// Check to to see existence of user

// get all user info OR
// get profile for specific user
/api/users/:id

/api/users/:id/friends

/api/users/:id/expenses
/api/users/:id/expenses-users
/api/users/:id/users-expense-pools

