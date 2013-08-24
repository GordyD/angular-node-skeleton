var db = require('../../lib/db.js'),
	memberApi = require('../../lib/api/member.js');

// Auth function - not for exposure through API
exports.authenticate = function(req, res, next) {
  if (!req.session.member_id) {
  	res.status(401);
    res.json({status: 'You need to be logged in to view this page.'});
  } else {
    next();
  }
}

exports.session = function(req, res) {
	memberApi.get(req.session.member_id).then(
		function woo(result) {
			if (result.rows.length === 1) {
				res.json(result.rows[0]);
			} else {
				res.status(401);
				res.json({status: 'Something went terribly wrong, your membership does not exist.'});
			}
		},
		function ahh(err) {
			res.status(401);
			res.json(err);
		}
	);
}

exports.login = function(req, res) {
	var facebook_id = req.body.facebook_id | undefined,
	username = req.body.username | undefined,
	password = req.body.password | undefined,
	query = 'SELECT * FROM member',
	params = [];
	
	if (facebook_id) {
		query += ' WHERE facebook_id = $1'; 
		params = [facebook_id];
	} else if (username && password) {
		query += ' WHERE username = $1 AND password = $2'
		params = [username, password];
	} else {
		res.status(500);
		res.json(false);
		return;
	}

	db.query(query,params).then(
		function woo(result) {
			if (result.rows.length === 1) {
				return result.rows[0];
			} else {
				return false;
			}
		}, 
		function ahh(error) {
			return false
		}
	).then(
	 function(result) {
	 	req.session.member_id = result.id;
	 	res.json(result);
	 }, 
	 function(error) {
	 	res.status(500);
	 	res.json(err);
	 }
	);
};

exports.logout = function (req, res) {
	delete req.session.member_id;
	res.json({ result: true });
}