// the required variables
var mysql = require('mysql');
var inquirer = require('inquirer');

// connection.query('INSERT INTO products SET ?', {
//   flavor: 'Rocky Road',
//   price: 3.00,
//   quantity: 50
// }, function(err, res) {});

// connection.query('UPDATE products SET ? WHERE ?', [{
//   quantity: 100
// }, {
//   flavor: 'Rocky Road'
// }], function(err, res) {});

// connection.query('DELETE FROM products WHERE ?', {
//   flavor: 'strawberry'
// }, function(err, res) {});

// connection.query('SELECT * FROM products', function(err, res) {
//   if (err) throw err;
//   console.log(res);
// });


// connecting to the database
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'Bamazon'
});

// connect to the server
connection.connect(function(err) {
  if (err) throw err;
  console.log('connected...');
});



// reset console screen
console.reset = function () {
	console.log('');
    console.log('');
    console.log('no worries, maybe next time. Goodbye.')
    console.log('');
    console.log('');
    
    setTimeout(function () {
  		return process.stdout.write('\033c');
	}, 1000);
  	
};

// start the app
var startApp = function(){
	var query = {};
	var dataList = '';
	var stock = '';
	var price = '';
	initialQuestions(); // this will initialize the app
}

// ============
// DISPLAY DATA
// ============

// display mysql data to the screen
// function displayData() {
// 	dataList = 'SELECT * FROM products';
// 	query = connection.query(dataList, function(err, res){
// 		console.log('');
// 		console.log('');
// 		console.log('Welcome to Bamazon! ');
// 		console.log('');
// 		console.log('');
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			for (var i = 0; i < res.length; i++) {
// 				console.log(

// 					`SHOW TABLES; `
// 					'ITEM ID: ' + res[i].item_id  + '\n' +
// 					'Product Name: ' + res[i].product_name + '\n' +
// 					'Department: '+ res[i].department_name + '\n' + 
// 					'Price: ' + res[i].price + '\n' + 
// 					/* 'Stock: ' + res[i].stock_quantity + '\n' + */ 
// 					'====================='

// 				);
// 			}

// 		initialQuestions();	
		
// 		}
// 	});
// }

// prompt questions
function initialQuestions() {
	dataList = 'SELECT * FROM products';
	query = connection.query(dataList, function(err, res){
		if (err) throw err;
		inquirer.prompt([
			{
				name: 'id',
				type: 'list',
				choices: function() {
			        var choiceArray = [];
			        for (var i = 0; i < res.length; i++) {
			        	choiceArray.push(res[i].product_name);
			        }
			        
			        return choiceArray;
	        	},
				message: 'Choose the ID of product you\'d like to purchase: '
				},
		// ]).then(function(idNumber) {
		// 	var choice = query._results[0][idNumber.id].product_name;
		// 	console.log(choice);
		// 	inquirer.prompt([
				{
					type: 'input',
					message: 'How many would you like to purchase? ',
					name: 'amount'
				}
			
			]).then(function(answer){
				var chosenItem;
			    for (var i = 0; i < res.length; i++) {
			    	if (res[i].item_name === answer.choice) {
			    		chosenItem = res[i];
			    	}
			    }

				stock = query._results[0][2].stock_quantity;
				price = query._results[0].price;
				console.log(query._results[0][chosenItem]);
				console.log(stock);

				if (answer.amount <= stock) {
					var updateFrom = 'UPDATE products SET stock_quantity = ?';
					connection.query(updateFrom, [answer.amount], function(err, res){
						if (err) {
							console.log(err);
						} else {
								console.log('That will be ' + '$' + price * answer.amount + '.');
								console.log('there are ' + stock + ' left');
						}
					});
					

				} else {
					console.log('Sorry, we don\'t have enough')
				}

			}).then(function(){
					inquirer.prompt([
					{
						type: 'confirm',
						message: 'Would you like to purchase another item?',
						name: 'confirm',
						default: true				
					}
				]).then(function(choice){
					if (choice.confirm) {
						startApp();

					} else {

						console.reset();
					}
				})
			})

		// });
	});
}

startApp();