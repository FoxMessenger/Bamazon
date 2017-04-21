// the required variables
var mysql = require('mysql');
var inquirer = require('inquirer');

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

// ending the connection
var end = function() {
    connection.end(function(err) {
        // The connection is terminated now
    });
}

// reset console screen
console.reset = function() {
    console.log('');
    console.log('');
    console.log('no worries, maybe next time. Goodbye.')
    console.log('');
    console.log('');

    setTimeout(function() {
        return process.stdout.write('\033c');
    }, 1000);

};

// start the app
function startApp() {
    var query = {};
    var dataList = '';
    var stock = '';
    var price = '';
    initialQuestions(); // this will initialize the app
}

// ============
// DISPLAY DATA
// ============

// prompt questions
function initialQuestions() {

 inquirer.prompt([
    	{
            name: 'menu',
            type: 'list',
            choices: ['View Products for Sale', 'View low Inventory', 'Add to Inventory', 'Add new Product'],
            message: 'What would you like to do: '

        },
        // {
        //     type: 'input',
        //     message: 'How many would you like to purchase? ',
        //     name: 'amount',
        //     validate: function(val) {
        //         if (isNaN(val) === false) {
        //             return true;
        //         }
        //         return false;
        //     }
        // }

            // WE WANT TO GRAB THIS INFORMATION AND MODIFY OUR TABLES

    ]).then(function(choice) {
		switch(choice.menu) {
			case 'View Products for Sale':
				// console.log('This is the basic promp!')
				productList();
			break;

			case 'View low Inventory':
				viewLowInventory()
				// cloze.prompt('This is the cloze prompt!');
			break;
			
			case 'Add to Inventory':
				addToInventory()
				// cloze.prompt('This is the cloze prompt!');
			break;

			case 'Add new Product':
				addNewProduct()
				// cloze.prompt('This is the cloze prompt!');
			break;
		}
	})
}

// ============
// SWITCH CASES
// ============
    

function productList() {
	dataList = 'SELECT * FROM products';
    query = connection.query(dataList, function(err, res) {	
    	function listOfProducts() {
            var choiceArray = [];
            for (var i = 0; i < res.length; i++) {
                choiceArray.push(res[i].product_name);
            }
            
            console.log(choiceArray);
    	}

    	listOfProducts()
    	
    })

    

}

     
     //    console.log('in stock: ' + stock);
     //    console.log('requested ' + answer.amount);

     //    if (answer.amount <= stock) {
     //        var updateFrom = 'UPDATE products SET stock_quantity = ?';
            
     //        connection.query(updateFrom, [(stock - answer.amount)], function(err, res) {
     //            if (err) {
     //                console.log(err);
     //            } else {
     //                console.log((stock - answer.amount) + ' left in stock.');
     //                console.log('That will be ' + '$' + (price * answer.amount) + '.');
     //            }
     //            answerAmountQuery()
     //            // after
     //            function answerAmountQuery() {
     //                inquirer.prompt([{
     //                    type: 'confirm',
     //                    message: 'Would you like to purchase another item?',
     //                    name: 'confirm',
     //                    default: true
     //            	}]).then(function(choice) {
     //                    if (choice.confirm) {
     //                        startApp();
     //                    } else {
     //                        console.reset();
     //                        end();
     //                    }
     //                })
                    
     //            } 

     //        })
    	// } else {
     //    	console.log('Sorry, we don\'t have enough');
     //    }
    // })
// }

startApp();