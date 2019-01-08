var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "root",
  database: "bamazon"
});
// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  startBamazon();
});

function startBamazon() {
  getAllDBItems();
}

function getAllDBItems() {
  connection.query("SELECT * FROM products", function (err, results) {
    console.log("Welcome to Bamazon!")
    console.log('--------------------------------------------------------------------------------------')

    for (var i = 0; i < results.length; i++) {
      console.log('Item ID:  ' + results[i].item_id + ' | ' + 'Product:  ' + results[i].product_name + ' | ' + 'Department:  ' + results[i].department_name + ' | ')
      console.log('------------------------------------------------------------------------------------')
    }

  })
}


