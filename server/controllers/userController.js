const fs = require('fs')

// require csvtojson module
const CSVToJSON = require('csvtojson');
// path of the database
const csvFilePath = '../company/server/database/employees.txt'


function compareStrings(a, b) {
    // Assuming you want case-insensitive comparison
    a = a.toLowerCase();
    b = b.toLowerCase();
  
    return (a < b) ? -1 : (a > b) ? 1 : 0;
  }
  



function paginator(items, current_page, per_page_items) {
	let page = current_page || 1,
	per_page = per_page_items || 10,
	offset = (page - 1) * per_page,

	paginatedItems = items.slice(offset).slice(0, per_page_items),
	total_pages = Math.ceil(items.length / per_page);

	return {
		page: page,
		per_page: per_page,
		pre_page: page - 1 ? page - 1 : null,
		next_page: (total_pages > page) ? page + 1 : null,
		total: items.length,
		total_pages: total_pages,
		users: paginatedItems
	};
}



// View Users
exports.viewall = (req, res) => {
    let page = parseInt(req.query.page)
    console.log(page)
    CSVToJSON({noheader:true, headers:['id','name', 'surname', 'address', 'phone', 'email', 'birthdate']}).fromFile(csvFilePath)
    .then(data => {
        paginatedData= paginator(data, page, 10)
        res.render('home', paginatedData)
    }).catch(err => {
        // log error if any
        console.log(err);
    });
}


// Find User by Search
exports.find = (req, res) => {
    let searchTerm = req.body.search.toLowerCase()
    // User the connection
    CSVToJSON({noheader:true, headers:['id','name', 'surname', 'address', 'phone', 'email', 'birthdate']}).fromFile(csvFilePath)
    .then(users => {

        const found = users.some(user => user.name.toLowerCase() === searchTerm || user.surname.toLowerCase() == searchTerm  || user.email.toLowerCase() == searchTerm);

        if(found){
            users = users.filter(user => user.name.toLowerCase() === searchTerm || user.surname.toLowerCase() == searchTerm || user.email.toLowerCase() == searchTerm)
            res.render('home', {users, search:searchTerm})
        }else{
            users = []
            res.render('home',{ users})
        }
    }).catch(err => {
        // log error if any
        console.log(err);
    });
  }


  exports.sort = (req, res) => {
    let sort = req.body.sort.toLowerCase()
    let page = req.query.page || 1
    // User the connection
    CSVToJSON({noheader:true, headers:['id','name', 'surname', 'address', 'phone', 'email', 'birthdate']}).fromFile(csvFilePath)
    .then(users => {
        if( sort == "name"){
            users.sort(function(a, b){
                return compareStrings(a.name, b.name)
            })
        }
        if( sort == "surname"){
            users.sort(function(a, b){
                return compareStrings(a.surname, b.surname)
            })
        }
        paginatedData= paginator(users, page, 10)
        res.render("home", paginatedData)
    }).catch(err => {
        // log error if any
        console.log(err);
    });
  }
  
    
  
  // Edit user
  exports.edit = (req, res) => {
    // User the connection
    res.render('edit-user')
  }
  
  
  // Update User
  exports.update = (req, res) => {
    const { first_name, last_name, email, phone, address, birthdate } = req.body;
    res.render('edit-user')

  }


  // delete user 
  exports.delete = (req, res) => {
     // User the connection
     let user_Id = req.params.id
     CSVToJSON({noheader:true, headers:['id','name', 'surname', 'address', 'phone', 'email', 'birthdate']}).fromFile(csvFilePath)
     .then(users => {
 
         const found = users.some(user => user.id == user_Id);
         if(found){
             users = users.filter(user => user.id !== user_Id)
             res.render('home', {users, alert:"user deleted"})
         }else{
            res.sendStatus(400)
         }
     }).catch(err => {
         // log error if any
         console.log(err);
         
     
     });

  }

// Add new user
exports.create = (req, res) => {
    const { first_name, last_name, email, phone, birthdate, address } = req.body;
    CSVToJSON({noheader:true, headers: ['id','name', 'surname', 'address', 'phone', 'email', 'birthdate']}).fromFile(csvFilePath)
    .then(users => {
        last_item_number = parseInt(users.slice(-1)[0].id)
        users.push({
            "id": last_item_number + 1,
            "name":first_name,
            "surname":last_name,
            "address":address,
            "phone":phone,
            "email":email,
            "birthdate":birthdate,
        })
        res.render("home", {users})
        
    }).catch(err => {
        // log error if any
        console.log(err);
    });   

}


// View Users
exports.view = (req, res) => {
    // User the connection
    let user_Id = req.params.id
    // User the connection
    CSVToJSON({noheader:true, headers:['id','name', 'surname', 'address', 'phone', 'email', 'birthdate']}).fromFile(csvFilePath)
    .then(users => {

        const found = users.some(user => user.id);
        if(found){
            users = users.filter(user => user.id === user_Id)
            console.log(users)
            res.render('view-user', {layout:"main", users})
        }else{
            users = []
            res.render('home',{ users})
        }
    }).catch(err => {
        // log error if any
        console.log(err);
        
    
    });

  
  }

exports.form = (req, res) =>{
    res.render('new-user')
}