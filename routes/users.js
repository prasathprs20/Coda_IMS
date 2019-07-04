

//login page start

exports.sign = function(req, res){

    
username=req.body.username;
			 
	password= req.body.password;


req.getConnection(function(err,connection){
	      
	       
	    	   var sql='SELECT * FROM admin WHERE username = ?';
		       connection.query(sql,[username],function(err,rows){
		           if(err)
		               {
		                   throw err;
		               }
		           else{
		               
		        	   if(rows.length >0){
		        		   if(password == rows[0].password){

		        		   	console.log("match");
		        		   req.session.username=username;
		        		   console.log(req.session.username);
		        		    res.redirect('/customers');

		        		   } else{
        res.send({
          "code":204,
          "success":"password does not match"
            });
      }
		        		      
		        	   }else{

                              //candidate authentication
                                     var sql='SELECT * FROM hr_details WHERE hr_id = ?';
		       connection.query(sql,[username],function(err,rows){
		           if(err)
		               {
		                   throw err;

		               }
		           else{
		               
		        	   if(rows.length >0){
		        		   if(password == rows[0].hr_password){

		        		   	console.log("match");
		        		   req.session.username=username;
		        		   console.log(req.session.username);
		        		    res.redirect('/customers');

		        		   } else{
        res.send({
          "code":204,
          "success":"Email and password does not match"
            });
      }
		        		      
		        	   }
		        	   else{
                                 res.send({
          "code":204,
          "success":"Email and password does not match"
            });

		        	   }

		       }	



		   });


        
                            

      }

		       }	       
		   });
		      
	   });

		      
	  
  //res.render('signup', { title: 'Hello World' });
};



//login page end


// UI Redirection link start

exports.register = function(req, res){


  res.render('register', { title: 'Hello World' });
};

exports.hr_register = function(req, res){


  res.render('hr_register', { title: 'Hello World' });
};

exports.candidate_register = function(req, res){


  res.render('candidate_register', { title: 'Hello World' });
};

//// UI Redirection link end


//candidate registration start

exports.cregister = function(req, res){

	username=req.body.username;

	var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {


        
        var data = {
            
            candidate_id    : input.username,
            candidate_password : input.password,
            candidate_name  : input.name,
            candidate_age   : input.age,
            candidate_gender : input.gender,
            candidate_phone_number : input.phno,
            candidate_email : input.email,
            candidate_address : input.address,
            candidate_edu_quali : input.education,
            candidate_experience : input.experience       
        };

        //check for exsisting user id


            
          var sql='SELECT * FROM candidate_details WHERE candidate_id = ?';
		       connection.query(sql,[username],function(err,rows){
		           if(err)
		               {
		                   throw err;
		               }
		           else if(rows.length >0){
		        		   
		        		      res.send({
                                   "code":204,
                                    "success":"Alredy this Id is  Exsisting"
                                    });
                    }
                    else{
                           var query = connection.query("INSERT INTO candidate_details set ? ",data, function(err, rows)
                           {
  
                            if (err)
                             console.log("Error inserting : %s ",err );
         
                              res.redirect('/');
          
                            }); 
                          }                   
		   });
        
       // console.log(query.sql); get raw query
    
    });


  //res.render('sup', { title: 'Hello World' });
};

//candidate registration end


//hr registration start

exports.hr_register = function(req, res){

	username=req.body.username;

	var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {


        
        var data = {
            
            hr_id    : input.username,
            hr_company_name   : input.cmnyname,
            hr_name   : input.name,
            hr_password  : input.password
        
        };

        //check for exsisting user id


            
          var sql='SELECT * FROM hr_details WHERE hr_id = ?';
		       connection.query(sql,[username],function(err,rows){
		           if(err)
		               {
		                   throw err;
		               }
		           else if(rows.length >0){
		        		   
		        		      res.send({
                                   "code":204,
                                    "success":"Alredy this Id is  Exsisting"
                                    });
                    }
                    else{
                           var query = connection.query("INSERT INTO hr_details set ? ",data, function(err, rows)
                           {
  
                            if (err)
                             console.log("Error inserting : %s ",err );
         
                              res.redirect('/');
          
                            }); 
                          }                   
		   });
        
       // console.log(query.sql); get raw query
    
    });


  //res.render('sup', { title: 'Hello World' });
};

//hr registration end

