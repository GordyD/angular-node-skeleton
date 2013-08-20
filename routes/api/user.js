var db = require('../../lib/db.js');

/*
 * TripJoin  /user API
 */

exports.collection = function (req, res) {
	db.query('SELECT * FROM user').then(
		function woo(result) {
			res.json({users: result.rows});
		},
		function ahh(err) {
			console.error(err);
			res.json(false);
		}
	);
};

exports.get = function (req, res) {
	var id = req.params.id;
	if(id >= 0) {
		db.query('SELECT * FROM user WHERE id = ' + id).then(
			function woo(result) {
				res.json({user: result.rows[0]});
			},
			function ahh(err) {
				console.error(err);
				res.json(false);
			}
		);
	} else {
		res.json(false);
	}
};

exports.create = function(req, res) {
	var insert = 'INSERT INTO user (destination, month, year) VALUES($1,$2,$3)',
	params = [req.body.destination, req.body.month, req.body.year];
	db.query(insert,params).then(
		function woo(result) {
			res.json(req.body);
		},
		function ahh(err) {
			console.error(err);
			res.json(false);
		}
	);
};

exports.edit = function(req, res) {
	var insert = 'UPDATE user SET destination = $2, month = $3, year = $4 WHERE id = $1',
	params = [req.params.id, req.body.destination, req.body.month, req.body.year];
	db.query(insert,params).then(
		function woo(result) {
			res.json(req.body);
		},
		function ahh(err) {
			console.error(err);
			res.json(false);
		}
	);
};

exports.delete = function(req, res) {
	var insert = 'DELETE FROM users WHERE id = $1',
	params = [req.params.id];
	db.query(insert,params).then(
		function woo(result) {
			res.json(true);
		},
		function ahh(err) {
			console.error(err);
			res.json(false);
		}
	);
};