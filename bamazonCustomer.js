// the required variables
var mysql = require('mysql');
var inquirer = require('inquirer');

// connection.query("INSERT INTO products SET ?", {
//   flavor: "Rocky Road",
//   price: 3.00,
//   quantity: 50
// }, function(err, res) {});

// connection.query("UPDATE products SET ? WHERE ?", [{
//   quantity: 100
// }, {
//   flavor: "Rocky Road"
// }], function(err, res) {});

// connection.query("DELETE FROM products WHERE ?", {
//   flavor: "strawberry"
// }, function(err, res) {});

// connection.query("SELECT * FROM products", function(err, res) {
//   if (err) throw err;
//   console.log(res);
// });


// connecting to the database
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "Bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected...");
});

// =======
// DISPLAY DATA
// =======

function displayData() {
	var dataList = "SELECT * FROM products";
	var query = connection.query(dataList, function(err, res){
		console.log('Welcome to Bamazon! ');
		if (err) {
			console.log(err);
		} else {
			for (var i = 0; i < res.length; i++) {
				console.log(

					'ITEM ID: ' + res[i].item_id  + '\n' +
					'Product Name: ' + res[i].product_name + '\n' +
					'Department: '+ res[i].department_name + '\n' + 
					'Price: ' + res[i].price + '\n' + 
					/* 'Stock: ' + res[i].stock_quantity + '\n' + */ 
					'====================='

				);
			}

		initialQuestions();	
		
		}
	});
}

function initialQuestions() {
	inquirer.prompt([
		{
			type: 'input',
			message: 'Choose the ID of product you\'d like to purchase: ',
			name: 'id'
			
		}
	]).then(function(choice) {
		var choice = res[choice].item_id;
		console.log(choice);
		inquirer.prompt([
			{
				type: 'input',
				message: 'How many would you like to purchase? ',
				name: 'amount'
			}
		
		]).then(function(choice){
			console.log('you want ' + choice.amount);
		})
		// console.log('choice is: ' + user.options);
		
		// switch(user.options) {
		// 	case 'my-tweets':
		// 	// run the function tweets of myTweets
		// 	myTweets.tweets();
		// 	break;

		// 	case 'spotify-this-song':
		// 	spotifyThisSong.prompt();
		// 	break;

		// 	case 'movie-this':
		// 	movieThis.prompt();
		// 	break;

		// 	case 'do-what-it-says':
		// 	doWhatItSays();
		// 	break;
	});
}

displayData()