
/*
 * GET users listing.
 */

// function to know the candidates who applied for the job

exports.job_applied_details = function(req, res){

  req.getConnection(function(err,connection){

        var q =" SELECT * FROM candidate_job_applied FULL OUTER JOIN candidate_details ON candidate_job_applied.candidate_id = candidate_details.candidate_id WHERE hr_id=?";
       
        connection.query(q,req.session.username,function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.send(rows);
                
           
         });
         
         
    });
  
};


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



//hr can view list jobs posted by him
exports.hr_view_job_details = function(req, res){

  req.getConnection(function(err,connection){

        var q =" SELECT * FROM job_details WHERE hr_id=?";
       
        connection.query(q,req.session.username,function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.send(rows);
                
           
         });
         
         //console.log(query.sql);
    });
  
};


//hr update jobs details posted by him
exports.hr_update_job_details = function(req, res){
    
    var id = req.params.jobid;
    
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM customer WHERE id = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.send(rows); 
           
         });
         
         
    }); 
};




/* hr add new job details */
exports.add_job_details = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            job_id    : input.id,
            hr_id      : req.session.username,
            job_role  : input.jobrole,
            job_description  : input.id,
            job_experience_required  : input.experience,
            job_location  : input.location,
            job_skills_required  : input.skills,
            job_salary  : input.salary

        };
        
        var query = connection.query("INSERT INTO customer set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.send("Inserted Successfully");
          
        });
        
           
    });
};

exports.hr_save_update_job_details = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var hrid = req.session.username;
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            job_id    : input.id,
            hr_id      : req.session.username,
            job_role  : input.jobrole,
            job_description  : input.id,
            job_experience_required  : input.experience,
            job_location  : input.location,
            job_skills_required  : input.skills,
            job_salary  : input.salary

        
        };
        
        connection.query("UPDATE customer set ? WHERE id = ? ",[data,hrid], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.send("Updated Successfully");
          
        });
    
    });
};





