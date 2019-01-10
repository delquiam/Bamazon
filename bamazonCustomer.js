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
})
// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  startBamazon();
});

function startBamazon() {
  getAllDBItems();
};

//Prints all items for purchase
function getAllDBItems() {
  connection.query("SELECT * FROM products", function (err, results) {
    console.log("Welcome to Bamazon!")
    console.log('---------------------------------------------------------------------------------------------------');

    for (var i = 0; i < results.length; i++) {
      console.log('Item ID:  ' + results[i].item_id + ' | ' + 'Product:  ' + results[i].product_name + ' | ' + 'Department:  ' + results[i].department_name + ' | ' + 'Price:  ' + results[i].price + ' | ' + 'In Stock:  ' + results[i].stock_quantity + ' | ');
      console.log('-----------------------------------------------------------------------------------------------------');
    }
    
      console.log(' ');

      inquirer.prompt([{
        name: "itemId",
        type: "input",
        message: "What is the item id of the product you would like to purchase?",
        validate: function (value) {
          if (isNaN(value) == false) {
            return true;
          } else {
            return false;
          }
        }
      },
      {
        name: "quantity",
        type: "input",
        message: "How many units would you like to purchase?",
        validate: function (value) {
          if (isNaN(value) == false) {
            return true;
          } else {
            return false;
          }
        }

      }]).then(function (answer) {
        var itemPurchase = (answer.itemId) - 1;
        var productToPurchase = results[itemPurchase];
        var quantityToPurchase = parseInt(answer.quantity);
        var grandTotal = parseInt(((results[itemPurchase]) * quantityToPurchase).toFixed(2));
        
        if (quantityToPurchase < results[itemPurchase].stock_quantity) {
          console.log("The total for your purchase is $" + grandTotal.toFixed(2) + "Your item(s) will be shipped in 5 business days.");

          connection.query("UPDATE products SET ? WHERE ?")[{
            stock_quantity: (results[itemPurchase].stock_quantity - quantityToPurchase)
          },
            { item_id: answer.itemId }
          ], function (err, results) {
            reprompt();
          }
        } else {
          console.log("Sorry, insufficient quantity requested, Please try again.");
          startBamazon();
        }
      });
    });
  }
    



    // asks if they would like to purchase another item

    function reprompt() {
      inquirer.prompt([{
        name: "reply",
        type: "confirm",
        message: "Would you like to purchase another item?"
      }]).then(function (answer) {
        if (answer.reply) {
          startBamazon();
        } else {
          console.log("Come back and visit us again!");
        }
      });
    }

    startBamazon();

