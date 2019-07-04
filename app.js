var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var userlogin = require('./routes/hr_candidate_login');
var candidate = require('./routes/candidate_operations');
var hr = require('./routes/hr_operations');


var customers = require('./routes/customers');

var app = express();

var session = require('express-session');
app.use(session({secret:'XASDASDA'}));


var connection  = require('express-myconnection'); 
var mysql = require('mysql');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    
    connection(mysql,{
        
        host: 'localhost', //'localhost',
        user: 'root',
        password : '',
        port : 3306, //port mysql
        database:'nodedlms'

    },'pool') //or single

);


app.get('/', indexRouter.test);
//app.post('/signup',usersRouter.sign);

//user login
app.post('/signup',userlogin.sign);

//candidate registeration
app.post('/hr_candidate_login/creg',userlogin.cregister);

//hr registeration
app.post('/hr_candidate_login/hr_reg',userlogin.hr_register);

//candidate_view_his_details
app.get('/candidate_operations/view_candidate',candidate.view_candidate_details);

//candidate_view_job_details
app.get('/candidate_operations/candidate_view_jobdetails',candidate.candidate_view_job_details);

//candidate_view_applied_job_details
app.get('/candidate_operations/candidate_view_applied_jobdetails',candidate.candidate_view_applied_job_details);

//candidate_retrive data to update_profile
app.get('/candidate_operations/candidate_update_profiledetails',candidate.candidate_update_profile_details);

//candidate_save_update_profile_details
app.post('/candidate_operations/candidate_save_update_profiledetails',candidate.candidate_save_update_profile_details);

//hr_view_job_applied_by_candidate
app.get('/hr_operations/view_job_applied_details',hr.job_applied_details);

//hr_view_list of job_details posted by him
app.get('/hr_operations/view_job_details',hr.hr_view_job_details);

//update_job_details
app.get('/hr_operations/update_job_details/job_id',hr.hr_update_job_details);

//add new job by hr
app.get('/hr_operations/add_job_details',hr.add_job_details);

//add new job by hr
app.post('/hr_operations/add_job_details/job_id',hr.hr_save_update_job_details);

/*
app.get('/register',usersRouter.register);

//
app.get('/candidate_register',usersRouter.candidate_register);

//registering  candidate details
app.post('/cregister_signup',usersRouter.cregister);

//registering hr details
app.post('/hr_register_signup',usersRouter.hr_register);

//



app.get('/customers', customers.list);
app.get('/customers/add', customers.add);
app.post('/customers/add', customers.save);
app.get('/customers/delete/:id', customers.delete_customer);
app.get('/customers/edit/:id', customers.edit);
app.post('/customers/edit/:id',customers.save_edit); 

*/


//app.use(app.router);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
