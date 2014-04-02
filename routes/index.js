
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
	
exports.helloworld = function(req, res){
	res.render('helloworld', {title: 'Hello, World!'})
};

exports.userlist = function(db){
    return function(req, res){
        var collection = db.get('usercollection');
        collection.find({},{},function(e, docs){
            res.render('userlist', {
                'userlist' : docs
            });
        });
    };
};

exports.newuser = function(req, res){
    res.render('newuser', {title: 'New User'});
};

exports.adduser = function(db){
    return function(req,res){
        //get data from post
        var username = req.body.username;
        var useremail = req.body.useremail;

        //get db collection
        var collection = db.get('usercollection');

        //insert to db
        collection.insert({
            "username" : username,
            "email" : useremail
        }, function(err, doc) {
            if(err){
                //inser failed
                res.send('There was an error inserting to the database');
            } else{
                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location('userlist');
                //redirect to completed page
                res.redirect('userlist');
            }

        });


    };
};