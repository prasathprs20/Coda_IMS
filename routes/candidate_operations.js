
/*
 * GET users listing.
 */


//candidates can view their own details
exports.view_candidate_details = function(req, res){

  req.getConnection(function(err,connection){

        var q =" SELECT * FROM candidate_details WHERE candidate_id=?";
       
        connection.query(q,req.session.username,function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.send(rows);
                
           
         });
         
    });
  
};


//candidate can view list jobs posted by hr
exports.candidate_view_job_details = function(req, res){

  req.getConnection(function(err,connection){

        var q =" SELECT * FROM job_details";
       
        connection.query(q,function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            
            res.send(rows);
                
           
         });
         
         
    });
  
};


//candidate can view list jobs applied
exports.candidate_view_applied_job_details = function(req, res){

  req.getConnection(function(err,connection){

        var q =" SELECT * FROM job_details FULL OUTER JOIN candidate_job_applied ON job_details.job_id = candidate_job_applied.job_id WHERE candidate_id=?";
       
        connection.query(q,req.session.username,function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.send(rows);
                
           
         });
         
         
    });
  
};

//candidate profile update 
exports.candidate_update_profile_details = function(req, res){
    
    var id = req.session.cid;
    
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM candidate_details WHERE id = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.send(rows);  
           
         });
         
         
    }); 
};


//candidate save profile update 
exports.candidate_save_update_profile_details = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var cid = req.session.username;
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            candidate_id    : cid,
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
        
        connection.query("UPDATE customer set ? WHERE id = ? ",[data,cid], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.send("Updated successfully");
          
        });
    
    });
};


