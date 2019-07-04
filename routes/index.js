exports.test = function(req, res){
  res.render('user_login', { title: 'Hello World' });
};

exports.sup = function(req, res){
  res.render('sup', { title: 'Hello World' });
};

