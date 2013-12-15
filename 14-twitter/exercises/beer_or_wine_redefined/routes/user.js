
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};


exports.show = function(req, res) {
  console.log('I GOT HERE!!!!');
  var user = {
    name: 'Brian',
    image: '/image',
    text: 'Hello! I like Express'
  };
  res.render('users/show', {user: user});
};


