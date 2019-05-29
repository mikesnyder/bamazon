var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table2');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "bamazon",
    port: 3306
})
connection.connect();

var display = function() {
    connection.query("SELECT * FROM products",function(err,res){
        if(err) throw err;
        console.log("====================================");
        console.log("================== Bamazon ==================");
        console.log("====================================");
        console.log("================ Products ================");
    
    var table = new Table({
        head: ["item id", "Product Name", "Cost"],
        colWidth: [12, 50, 8],
        colAligns: ["center","left","right"],
        style: {
            head: ["aqua"],
            compact: true
        }
    });
    for (var i = 0; i < res.length; i++){
        table.push([res[i].item_id, res[i].product_name, res[i].price]);
    
    }
    console.log(table.toString());
    console.log("");
});
};

var shopping = function() {
    inquirer.prompt ({
        name: "BuyId",
        type: "input",
        message: "What is the 'item id' of the product that you want to buy?"
    }).then(function(IdAnswer){
        var selection = IdAnswer.BuyId;
        connection.query("SELECT * FROM products WHERE item_id=?", selection, function(err,res){if (err) throw err;
        if (res.length === 0) {
            console.log("Invalid Item Id. Please enter an Item Id from the table.");
            shopping();
        } else {
            inquirer.prompt({
                name: "quantity",
                type: "input",
                message: "How many would you like to purchase?"
            }).then(function(QtyAnswer){
            var quantity = QtyAnswer.quantity;
            if (quantity > res[0].stock_quantity) {
                console.log("We only have enough to fulfill "+ res[0].stock_quantity + " units of requested product")
                shopping();
            }
        else {
            console.log("");
            console.log(res[0].product_name + " purchased");
            console.log(quantity + " qty @ $" + res[0].price);
            var newQty =
                res[0].stock_quantity - quantity;
                connection.query("UPDATE products SET stock_quantity = " + newQty + " WHERE id = " + res[0].id, function(err, resUpdate) {
                    if (err) throw err;
                    console.log("");
                    console.log("Thank you for your order!");
                    console.log("");
                    connection.end();
                }
                );
            }
        });
        }
        });
    });
};
display();